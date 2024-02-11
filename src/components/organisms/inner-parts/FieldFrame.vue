<script setup lang="ts">
import { ref } from 'vue';
import InputTextCounter from '@/components/organisms/inner-parts/InputTextCounter.vue';
withDefaults(
    defineProps<{
        /**
         * 見出し
         */
        label?: string;
        /**
         * 見本
         */
        placeholder?: string;
        /**
         * 無効か
         */
        disabled?: boolean;
        /**
         * 必須か
         */
        required?: boolean;
        /**
         * 表示種類
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * 形状
         */
        shape?: 'normal' | 'rounded' | 'no-radius';
        /**
         * フォーカス中か
         */
        isFocus?: boolean;
        /**
         * 最大文字数
         */
        maxLength?: number | null;
        /**
         * 値
         */
        value?: string | number | boolean;
        /**
         * エラーメッセージを表示するか
         */
        isErrorMessage?: boolean;
        /**
         * エラーメッセージ配列
         */
        errors?: string[];
        /**
         * タグ
         */
        bodyTag?: string;
    }>(),
    {
        label: ' ',
        placeholder: '',
        disabled: false,
        required: false,
        variant: 'secondary',
        size: 'medium',
        shape: 'normal',
        isFocus: false,
        line: 1,
        maxLength: null,
        value: '',
        isErrorMessage: true,
        errors: () => [],
        bodyTag: 'label'
    }
);

const frameRef = ref();

defineExpose({ frameRef });
</script>

<template>
    <div
        class="component-input-frame"
        :class="[
            variant,
            size,
            shape,
            {
                'is-focus': isFocus,
                'is-required': required,
                'is-inputed': value != null && value !== '',
                'is-disabled': disabled
            }
        ]"
    >
        <div ref="frameRef" class="frame-box">
            <div class="frame-label">
                <div class="label-box">
                    <span v-if="label" class="label">{{ label }}</span
                    ><span v-if="placeholder" class="placeholder">（例：{{ placeholder }}）</span>
                </div>
            </div>
            <div class="frame-grow" />
            <div class="frame-counter">
                <InputTextCounter
                    v-if="maxLength"
                    class="counter"
                    :text="value as string"
                    :max="maxLength"
                />
            </div>
        </div>
        <component :is="bodyTag" class="frame-body">
            <slot />
        </component>
        <template v-if="isErrorMessage">
            <div v-for="error in errors" :key="error" class="error">{{ error }}</div>
        </template>
    </div>
</template>

<style scoped>
.component-input-frame {
    --start-end-padding: 16px;
    position: relative;
    min-width: 100px;
    min-height: var(--height);
    width: 100%;
    font-size: var(--font-size);
    :where(.frame-box) {
        position: absolute;
        text-align: left;
        display: flex;
        justify-content: space-between;
        min-width: 100px;
        width: 100%;
        height: 100%;
        min-height: var(--height);
        line-height: 1.5em;
        background-color: var(--color-theme-bg-primary);
        border-color: var(--border-color);
        border-radius: 4px;
        outline: 1px solid transparent;
        transition:
            height 0.2s,
            outline 0.2s;

        &::before,
        &::after {
            content: '';
            width: var(--start-end-padding);
            border: 1px solid;
            border-color: inherit;
            transition: border-color 0.2s;
            flex-shrink: 0;
        }
        &::before {
            border-right: 0;
            border-radius: 4px 0 0 4px;
        }
        &::after {
            border-left: 0;
            border-radius: 0 4px 4px 0;
        }

        .frame-label,
        .frame-grow,
        .frame-counter {
            border: 1px solid;
            border-color: inherit;
            border-right: 0;
            border-left: 0;
            transition: border-color 0.2s;
            flex-shrink: 0;
        }

        .frame-label {
            position: relative;
            display: flex;
            align-items: center;
            .label-box {
                display: flex;
                align-items: center;
                height: 100%;
                transition: 0.2s;
                pointer-events: none;
                transform: translateY(calc(-50% + (var(--height) / 2) - 1px));
                .label {
                    transition: color 0.2s;
                    color: var(--color-theme-text-secondary);
                    height: 1em;
                    line-height: 1em;
                    vertical-align: baseline;
                }

                .placeholder {
                    font-size: var(--font-size-small);
                    color: var(--color-theme-text-secondary);
                    height: 1em;
                    line-height: 1em;
                    vertical-align: baseline;
                }
            }
        }

        .frame-grow {
            flex-grow: 1;
        }

        .frame-counter {
            border-top: 0;
            .counter {
                pointer-events: none;
                transform: translateY(-50%);
                display: flex;
                align-items: center;
            }
        }
    }
    .frame-body {
        position: relative;
        padding-left: calc(var(--start-end-padding) / 2);
        padding-right: calc(var(--start-end-padding) / 2);
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        height: 100%;
    }

    /* required */
    &.is-required > .frame-box > .frame-label > .label-box > .label {
        &::after {
            left: -0.5em;
            color: var(--color-status-danger);
            content: '*';
        }
    }

    /* disabled */
    &.is-disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    /* focus */
    &.is-focus > .frame-box {
        outline-color: var(--border-color);
    }
    &:is(.is-inputed, .is-focus) > .frame-box > .frame-label {
        border-top: 0;

        > .label-box {
            transform: translateY(-50%);
            font-size: var(--font-size-small);
            .label {
                color: var(--color-theme-text-primary);
            }
        }
    }

    /* hover */
    @media (hover: hover) {
        &:hover {
            .frame-box {
                outline-color: var(--border-color);
            }
        }
    }

    @media (hover: none) {
        &:active {
            .frame-box {
                border-color: var(--border-color);
            }
        }
    }
}

.error {
    font-size: var(--font-size-small);
    color: var(--color-status-danger);
}

/* ▼ variant ▼ */
.primary {
    --border-color: var(--color-theme-active);
}
.secondary {
    --border-color: var(--color-theme-border);
}
.info {
    --border-color: var(--color-status-info);
}
.success {
    --border-color: var(--color-status-success);
}
.warning {
    --border-color: var(--color-status-warning);
}
.danger {
    --border-color: var(--color-status-danger);
}
/* ▲ variant ▲ */

/* ▼ size ▼ */
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
/* ▲ size ▲ */

/* ▼ shape ▼ */
.rounded {
    .frame-box {
        border-radius: var(--start-end-padding);
        &::before {
            border-radius: calc(var(--start-end-padding) * 4) 0 0 calc(var(--start-end-padding) * 4);
        }
        &::after {
            width: var(--start-end-padding);
            border-radius: 0 calc(var(--start-end-padding) * 4) calc(var(--start-end-padding) * 4) 0;
        }
    }
}
.no-radius {
    .frame-box {
        border-radius: 0;
        &::before,
        &::after {
            border-radius: 0;
        }
    }
}
/* ▲ shape ▲ */
</style>
