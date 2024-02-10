<script setup lang="ts">
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue';
import { useField } from 'vee-validate';
import { ZodString } from 'zod';
import FieldFrame from '@/components/organisms/inner-parts/FieldFrame.vue';
import DatePicker from '@/components/organisms/controls/DatePicker.vue';
import OpacityTransition from '@/components/organisms/inner-parts/OpacityTransition.vue';
import {
    XCircle as IconXCircle,
    CalendarDays as IconCalendarDays,
    Eye as IconEye,
    EyeOff as IconEyeOff,
    Search as IconSearch
} from 'lucide-vue-next';
import { DATE_FORMAT } from '@/assets/ts/const ';
import dayjs from 'dayjs';

type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
type FieldType = 'text' | 'email' | 'password' | 'time' | 'date' | 'number' | 'tel' | 'search';
const model = defineModel<string>();
const props = withDefaults(
    defineProps<{
        /**
         * フィールド名
         */
        name?: string;
        /**
         * zodスキーマ
         */
        schema?: ZodString;
        /**
         * 表示フォーマット(type: dateのみ)
         */
        format?: DateFormat;
        /**
         * modelフォーマット(type: dateのみ)
         */
        dataFormat?: DateFormat;
        /**
         * フォーマッター（displayFormatter、displayParserとの併用不可）
         */
        formatter?: (v: string) => string;
        /**
         * 表示フォーマッター（displayParserとセット運用、formatterとの併用不可）
         */
        displayFormatter?: (v: string) => string;
        /**
         * 表示パーサー（displayFormatterとセット運用、formatterとの併用不可）
         */
        displayParser?: (v: string) => string;
        /**
         * 見出し
         */
        label?: string;
        /**
         * prefix
         */
        prefix?: string;
        /**
         * suffix
         */
        suffix?: string;
        /**
         * 削除ボタン
         */
        clearable?: boolean;
        /**
         * 見本
         */
        placeholder?: string;
        /**
         * 無効か
         */
        disabled?: boolean;
        /**
         * 種類
         */
        type?: FieldType;
        /**
         * 表示種類
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
    }>(),
    {
        name: Math.random().toString(),
        schema: undefined,
        label: ' ',
        prefix: ' ',
        suffix: ' ',
        format: DATE_FORMAT.YYYYMMDD_JA,
        dataFormat: DATE_FORMAT.YYYYMMDD,
        formatter: (v: string) => v,
        displayFormatter: (v: string) => v,
        displayParser: (v: string) => v,
        clearable: false,
        placeholder: '',
        disabled: false,
        type: 'text',
        variant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);

defineEmits<{
    search: [value: string];
}>();

const fieldType = ref(props.type === 'number' ? 'tel' : props.type);
const { value, errors } = useField<string>(props.name);
const schemaChunks = computed(() => props.schema?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);
const max = computed(
    () =>
        (
            schemaChunks.value.find((check) => check.kind === 'max') as {
                kind: 'max';
                value: number;
                message?: string;
            }
        )?.value || null
);

const formatValue = ref('');
watch(formatValue, (v) => {
    // フォーマット処理

    const formatedValue = props.formatter(v);
    const displayFormatedValue = props.displayFormatter(formatedValue);
    const nativeParsedValue = props.displayParser(formatedValue);

    formatValue.value = displayFormatedValue;
    value.value = nativeParsedValue;
});
watch(value, (v) => {
    model.value = v;
});

// NOTE: 曖昧一致により、nullとundefinedを判定し、0は判定外とする
if (value.value == null && model.value != null) {
    value.value = model.value || '';
}
formatValue.value = value.value;

const inputRef = ref();
const isFocus = ref(false);
const onDelete = () => {
    formatValue.value = '';
    value.value = '';
};

// --- ▼ type: Password時の処理 ▼ ---
const isShowPassword = ref(false);
const onShowPassword = () => {
    isShowPassword.value = true;
    fieldType.value = 'text';
};
const onHidePassword = () => {
    isShowPassword.value = false;
    fieldType.value = 'password';
};
// --- ▲ type: Password時の処理 ▲ ---

// --- ▼ type: Date時の処理 ▼ ---
const onDateButonClick = () => {
    isFocus.value = true;
};

// DatePicker枠外制御
const onCloseAccordion = (event: Event) => {
    if (!isFocus.value || inputRef.value.contains(event.target as Node)) {
        return;
    }

    isFocus.value = false;
};

onMounted(() => {
    if (props.type === 'date') {
        window.addEventListener('click', onCloseAccordion);
    }
});

onBeforeUnmount(() => {
    if (props.type === 'date') {
        window.removeEventListener('click', onCloseAccordion);
    }
});
// --- ▲ type: Date時の処理 ▲ ---
</script>

<template>
    <div
        ref="inputRef"
        class="component-input"
        :class="[variant, size, { 'is-focus': isFocus, 'is-value': value != null && value !== '' }]"
    >
        <FieldFrame
            :label="label"
            :placeholder="placeholder"
            :required="isRequired"
            :disabled="disabled"
            :variant="variant"
            :size="size"
            :is-focus="isFocus"
            :maxLength="max"
            :value="value"
            :isErrorMessage="isErrorMessage"
            :errors="errors"
        >
            <slot name="prefix" />
            <div v-if="prefix" class="prefix-suffix">{{ prefix }}</div>
            <button v-if="type === 'date'" class="input" @click="onDateButonClick">
                <span>{{ value ? dayjs(value).format(format) : '' }}</span>
                <IconCalendarDays />
            </button>
            <input
                v-else
                v-model.trim="formatValue"
                class="input"
                :type="fieldType"
                :name="name"
                :required="isRequired"
                :disabled="disabled"
                placeholder=" "
                @focus="isFocus = true"
                @blur="isFocus = false"
            />
            <div v-if="suffix" class="prefix-suffix">{{ suffix }}</div>
            <slot name="suffix" />
            <div class="icon-box" v-if="clearable">
                <OpacityTransition>
                    <IconXCircle v-show="value != null && value !== ''" @click.prevent="onDelete" />
                </OpacityTransition>
            </div>
            <div class="icon-box" v-if="type === 'password'">
                <OpacityTransition>
                    <div v-show="value != null && value !== ''">
                        <IconEye v-show="isShowPassword" @click.prevent="onHidePassword" />
                        <IconEyeOff v-show="!isShowPassword" @click.prevent="onShowPassword" />
                    </div>
                </OpacityTransition>
            </div>
            <div class="icon-box always-visible" v-if="type === 'search'">
                <OpacityTransition>
                    <IconSearch @click.prevent="$emit('search', value)" />
                </OpacityTransition>
            </div>
        </FieldFrame>

        <OpacityTransition v-if="type === 'date'">
            <DatePicker
                v-show="isFocus"
                v-model="value"
                class="datepicker"
                :format="format"
                :dataFormat="dataFormat"
                @update:model-value="isFocus = false"
            />
        </OpacityTransition>
    </div>
</template>

<style scoped>
.component-input {
    width: 100%;
    min-height: var(--height);
    font-size: var(--font-size);
    :where(.input) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 100px;
        width: 100%;
        line-height: 1.5em;
        background-color: transparent;
        color: var(--color-theme-text-primary);
        border: 0;
        padding: 0;
    }

    [type='time'] {
        color: transparent;
    }
    &.is-focus,
    &.is-value {
        [type='time'] {
            color: var(--color-theme-text-primary);
        }
    }

    [type='search'] {
        &::-webkit-search-cancel-button {
            -webkit-appearance: none;
        }
    }
    @media (hover: hover) {
        /* PC */
        &.is-focus,
        &:hover {
            .icon-box {
                .lucide {
                    opacity: 1;
                }
            }
        }
    }

    @media (hover: none) {
        /* mobile */
        &.is-focus,
        &:active {
            .icon-box {
                .lucide {
                    opacity: 1;
                }
            }
        }
    }

    .prefix-suffix {
        color: transparent;
        flex-shrink: 0;
    }
    &.is-focus,
    &.is-value {
        .prefix-suffix {
            color: var(--color-theme-text-primary);
        }
    }

    .icon-box {
        width: var(--font-size);
        &.always-visible {
            .lucide {
                opacity: 1;
            }
        }
        .lucide {
            opacity: 0;
            transition: opacity 0.2s;
        }
    }

    .datepicker {
        position: absolute;
    }
}

.large {
    --height: 40px;
    --font-size: var(--font-size-large);
}

.medium {
    --height: 32px;
    --font-size: var(--font-size-common);
}

.small {
    --height: 24px;
    --font-size: var(--font-size-small);
}
</style>
