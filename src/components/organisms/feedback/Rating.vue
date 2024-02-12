<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from '@/components/organisms/common/Button.vue';
import { Star as IconStar } from 'lucide-vue-next';

const model = defineModel<number>({ default: 0 });
const props = withDefaults(
    defineProps<{
        /**
         * 表示色
         */
        variant?: 'dynamic' | 'flat';
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * 表示個数
         */
        length?: number;
        /**
         * 0.5刻みにするか
         */
        half?: boolean;
        /**
         * 削除ボタン
         */
        clearable?: boolean;
        /**
         * 読み込み専用
         */
        readonly?: boolean;
    }>(),
    {
        variant: 'dynamic',
        size: 'medium',
        length: 5,
        half: false,
        clearable: false,
        readonly: false
    }
);

const HALF_STEP = 0.5;
const ratings = computed(() =>
    [...Array(props.length).keys()].map((i) => {
        const button = [
            {
                value: i + 1,
                classes: 'integer'
            }
        ];
        if (props.half) {
            button.push({
                value: i + 1 - HALF_STEP,
                classes: 'half'
            });
        }
        return button;
    })
);
const hoverValue = ref(model.value);
const onHover = (value: number) => {
    hoverValue.value = value;
};
const onLeave = () => {
    hoverValue.value = model.value;
};
const onClick = (value: number) => {
    if (props.readonly) {
        return;
    }

    if (props.clearable && model.value === value) {
        model.value = 0;
    } else {
        model.value = value;
    }
};
watch(model, (v) => {
    hoverValue.value = v;
});
</script>

<template>
    <div class="component-rating" :class="[variant, size]">
        <div class="rate" v-for="(rate, i) in ratings" :key="i">
            <Button
                class="button"
                :class="[
                    r.classes,
                    {
                        'is-over':
                            (model >= r.value && hoverValue >= r.value) || hoverValue >= r.value
                    }
                ]"
                :size="size"
                shape="link"
                :readonly="readonly"
                @mouseover="onHover(r.value)"
                @mouseleave="onLeave"
                @click="onClick(r.value)"
                v-for="r in rate"
                :key="r.value"
            >
                <IconStar class="icon" />
            </Button>
        </div>
    </div>
</template>

<style scoped>
.component-rating {
    min-height: var(--height);
    font-size: var(--font-size);

    display: flex;
    gap: 8px;
    justify-content: center;
    min-width: 100px;
    color: var(--color);
    transition:
        color 0.2s,
        background-color 0.2s;
    .rate {
        position: relative;
        display: flex;
        .button {
            .icon {
                color: var(--color);
                fill: transparent;
                width: var(--height);
                height: var(--height);
                transition:
                    color 0.2s,
                    fill 0.2s;
            }
            &.is-over {
                background-color: var(--color-theme-bg-primary);
                .icon {
                    fill: var(--background-color);
                }
            }
            &.half {
                position: absolute;
                left: 0;
                width: calc(var(--height) / 2);
                height: var(--height);
                overflow: hidden;
                .icon {
                    position: absolute;
                    top: 0;
                    left: 0;
                    max-inline-size: initial;
                }
            }
        }
    }
}

.dynamic {
    :deep(.icon) {
        --color: var(--color-base-orange) !important;
        --background-color: var(--color-base-orange) !important;
    }
}

.flat {
    :deep(.icon) {
        --color: var(--color-base-orange) !important;
        --background-color: var(--color-base-orange) !important;
    }
}

/* ▼ size ▼ */
.large {
    --height: 32px;
    --font-size: var(--font-size-large);
}

.medium {
    --height: 24px;
    --font-size: var(--font-size-medium);
}

.small {
    --height: 16px;
    --font-size: var(--font-size-small);
}
/* ▲ size ▲ */
</style>
