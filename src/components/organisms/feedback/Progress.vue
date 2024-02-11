<script setup lang="ts">
import { computed, useSlots, ref } from 'vue';

const model = defineModel<number>({ default: 0 });
const props = withDefaults(
    defineProps<{
        /**
         * 表示色
         */
        variant?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * 形状
         */
        shape?: 'line' | 'circle';
        /**
         * 最大値
         */
        max?: number;
        /**
         * テキストを表示しない
         */
        noText?: boolean;
    }>(),
    {
        variant: 'secondary',
        size: 'medium',
        shape: 'line',
        max: 100,
        noText: false
    }
);

const slots = useSlots();
const hasSlot = (name: string) => {
    return slots[name] ? !!(slots[name] as () => [])()?.length : false;
};

const circleRef = ref();

const progressFullRatio = computed(() => {
    const calc = Math.round((model.value / props.max) * 100);
    return props.max > calc ? calc : props.max;
});
const circumference = computed(() => Math.PI * (20 * 2)); //円周
const strokeDashoffset = computed(
    () => ((100 - progressFullRatio.value) / 100) * circumference.value
);
</script>

<template>
    <div class="component-progress" :class="[variant, size, shape]">
        <div class="progress-bar" v-if="shape === 'line'" />
        <svg
            v-if="shape === 'circle'"
            ref="circleRef"
            class="progress-circle"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 45.714285714285715 45.714285714285715"
            style="transform: rotate(calc(-90deg))"
        >
            <circle
                class="circle-underlay"
                fill="transparent"
                cx="50%"
                cy="50%"
                r="20"
                stroke="currentColor"
                :stroke-dasharray="circumference"
                stroke-dashoffset="0"
            />
            <circle
                class="circle-overlay"
                fill="transparent"
                cx="50%"
                cy="50%"
                r="20"
                stroke="currentColor"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="strokeDashoffset"
            />
        </svg>
        <slot v-if="hasSlot('default')" />
        <div class="ratio" v-else-if="!noText">{{ progressFullRatio }}%</div>
    </div>
</template>

<style scoped>
.component-progress {
    font-size: var(--font-size);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: var(--font-size);
    word-break: keep-all;
    pointer-events: none;
}

.primary {
    --color: var(--color-base-white);
    --background-color: var(--color-theme-active);
}

.secondary {
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-theme-text-secondary);
}

.info {
    --color: var(--color-theme-text-primary);
    --background-color: var(--color-status-info);
}

.success {
    --color: var(--color-base-white);
    --background-color: var(--color-status-success);
}

.warning {
    --color: var(--color-base-black);
    --background-color: var(--color-status-warning);
}

.danger {
    --color: var(--color-base-white);
    --background-color: var(--color-status-danger);
}

/* ▼ size ▼ */
.large {
    --circle-size: 160px;
    --font-size: var(--font-size-large);
    --border-width: calc(var(--font-size) / 3);
    .progress-circle {
        .circle-underlay,
        .circle-overlay {
            stroke-width: calc(var(--border-width) / 3);
        }
    }
}

.medium {
    --circle-size: 80px;
    --font-size: var(--font-size-medium);
    --border-width: calc(var(--font-size) / 3);
    .progress-circle {
        .circle-underlay,
        .circle-overlay {
            stroke-width: calc(var(--border-width) / 2);
        }
    }
}

.small {
    --circle-size: 40px;
    --font-size: var(--font-size-small);
    --border-width: calc(var(--font-size) / 3);
    .progress-circle {
        .circle-underlay,
        .circle-overlay {
            stroke-width: calc(var(--border-width) / 1);
        }
    }
}
/* ▲ size ▲ */

/* ▼ shape ▼ */
.line {
    min-width: 100px;
    .progress-bar {
        display: flex;
        width: 100%;
        position: relative;
        background-color: var(--color-theme-border);
        height: var(--border-width);
        border-radius: 1em;
        &::before {
            content: '';
            background-color: var(--background-color);
            width: v-bind(progressFullRatio + '%');
            height: 100%;
            border-radius: 1em;
            transition: width 0.2s;
        }
    }

    .ratio {
        flex-shrink: 0;
        width: 3em;
        text-align: right;
    }
}
.circle {
    min-width: 50px;
    width: var(--circle-size);
    height: var(--circle-size);
    .ratio {
        position: absolute;
        margin: auto;
    }
    .progress-circle {
        width: 100%;
        height: 100%;
        .circle-underlay {
            color: var(--color-theme-border);
        }
        .circle-overlay {
            color: var(--background-color);
            transition: stroke-dashoffset 0.2s;
        }
    }

    .ratio {
        text-align: center;
    }
}
/* ▲ shape ▲ */
</style>
