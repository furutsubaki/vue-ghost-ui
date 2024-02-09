<script setup lang="ts">
import { computed, watch } from 'vue';
import { useField } from 'vee-validate';
import { ZodString } from 'zod';
import InputFrame from '@/components/organisms/inner-parts/InputFrame.vue';
import { DATE_FORMAT } from '@/assets/ts/const ';

type DateFormat = (typeof DATE_FORMAT)[keyof typeof DATE_FORMAT];
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
         * 表示フォーマット
         */
        format?: DateFormat;
        /**
         * modelフォーマット
         */
        dataFormat?: DateFormat;
        /**
         * 見出し
         */
        label?: string;
        /**
         * 無効か
         */
        disabled?: boolean;
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
        format: DATE_FORMAT.YYYYMMDD_JA,
        dataFormat: DATE_FORMAT.YYYYMMDD,
        label: '',
        disabled: false,
        variant: 'secondary',
        size: 'medium',
        isErrorMessage: true
    }
);

const { value, errors } = useField<string>(props.name);

const schemaChunks = computed(() => props.schema?._def.checks || []);
const isRequired = computed(
    () => schemaChunks.value.some((check) => check.kind === 'min' && check.value === 1) || false
);

watch(value, (v) => {
    model.value = v;
});

if (value.value == null && model.value != null) {
    value.value = model.value;
}

const convertVueDatepickerFormat = (format: DateFormat) => {
    return format.replace(/(Y)/g, 'y').replace(/(D)/g, 'd');
};

const setDayClass = (date: string) => {
    const weekDay = new Date(date).getDay();
    if (weekDay == 6) {
        // 土曜日の場合、classに"saturday"を追加
        return 'saturday';
    }
    if (weekDay == 0) {
        // 日曜日の場合、classに"sunday"を追加
        return 'sunday';
    }
    return '';
};
</script>

<template>
    <div class="component-datepicker" :class="[variant, size, { 'is-disabled': disabled }]">
        <InputFrame
            :label="label"
            :required="isRequired"
            :disabled="disabled"
            :variant="variant"
            :size="size"
            :is-focus="true"
            :value="value"
            :isErrorMessage="isErrorMessage"
            :errors="errors"
            bodyTag="div"
        >
            <VueDatePicker
                v-model="value"
                class="datepicker"
                :format="convertVueDatepickerFormat(format)"
                :model-type="convertVueDatepickerFormat(dataFormat)"
                inline
                locale="ja"
                week-start="0"
                :enable-time-picker="false"
                auto-apply
                :day-class="setDayClass"
                v-bind="$attrs"
            />
        </InputFrame>
    </div>
</template>

<style scoped>
.component-datepicker {
    position: relative;
    text-align: left;
    display: block;
    width: fit-content;
    &.is-disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    :where(.datepicker) {
        :deep(.dp__menu) {
            border: none;
            background-color: transparent;

            .dp__calendar_item {
                display: flex;
                justify-content: center;
            }

            .saturday {
                color: #0000ff;
            }
            .sunday {
                color: #ff0000;
            }
        }
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
