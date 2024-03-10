<script setup lang="ts">
import { type Component, ref, computed, useSlots } from 'vue';
import OpacityTransition from '@/components/inner-parts/OpacityTransition.vue';
import TranslateTransition from '@/components/inner-parts/TranslateTransition.vue';
import Button from '@/components/basic/Button.vue';

const currentTab = defineModel<string>();
const props = withDefaults(
    defineProps<{
        /**
         * サイズ
         */
        size?: 'small' | 'medium' | 'large';
        /**
         * タブ配置
         */
        position?: 'top' | 'right' | 'bottom' | 'left';
        /**
         * タブ位置
         */
        tabAlign?: 'start' | 'center' | 'end' | 'between';
        /**
         * transition
         */
        transition?: 'translate' | 'opacity';
        /**
         * タブとslotの間のセパレータが不要か
         */
        noSeparator?: boolean;
        /**
         * タブ
         */
        tabs: { id: string; label: string; icon?: Component }[];
    }>(),
    {
        size: 'medium',
        position: 'top',
        tabAlign: 'start',
        transition: 'translate',
        noSeparator: false
    }
);

const tabAlignProperty = computed(() => {
    if (props.tabAlign === 'start') {
        return 'flex-start';
    } else if (props.tabAlign === 'center') {
        return 'center';
    } else if (props.tabAlign === 'end') {
        return 'flex-end';
    } else if (props.tabAlign === 'between') {
        return 'space-between';
    } else {
        return 'flex-start';
    }
});

// transition状態
const TransitionComponent =
    props.transition === 'opacity' ? OpacityTransition : TranslateTransition;
const transitionFrom = ref('right');

const tabHeaderRef = ref();
const tabButtonRef = ref();
const currentTabClientRects = computed(() => {
    const tabButtonNodes: HTMLButtonElement[] = tabButtonRef.value?.flatMap(
        (v: { buttonRef: HTMLButtonElement }) => v.buttonRef
    );

    if (!tabButtonNodes) {
        return undefined;
    }

    const currentTabButtonRef = tabButtonNodes.find(
        (node) => node.dataset.tabButton === currentTab.value
    )!;
    const parentRect = tabHeaderRef.value.getBoundingClientRect();
    const childRect = currentTabButtonRef.getBoundingClientRect();

    return {
        width: childRect.width,
        height: childRect.height,
        top: childRect.top - parentRect.top,
        right: childRect.right - parentRect.right,
        bottom: childRect.bottom - parentRect.bottom,
        left: childRect.left - parentRect.left
    };
});

const onChangeTab = (id: string) => {
    const newIndex = props.tabs.findIndex((tab) => tab.id === id);
    const currentIndex = props.tabs.findIndex((tab) => tab.id === currentTab.value);
    const transitionFromX = currentIndex > newIndex ? 'left' : 'right';
    const transitionFromY = currentIndex > newIndex ? 'top' : 'bottom';
    transitionFrom.value = ['top', 'bottom'].includes(props.position)
        ? transitionFromX
        : transitionFromY;

    currentTab.value = id;
};
</script>

<template>
    <div class="component-tab" :class="[size, position]">
        <div ref="tabHeaderRef" class="tab-header" :class="{ 'no-separator': noSeparator }">
            <Button
                ref="tabButtonRef"
                :data-tab-button="tab.id"
                :size="size"
                shape="skeleton"
                :readonly="currentTab === tab.id"
                v-for="tab in tabs"
                :key="tab.id"
                @click="onChangeTab(tab.id)"
                ><component :is="tab.icon" v-if="tab.icon" />{{ tab.label }}</Button
            >
            <span class="active-border" />
        </div>
        <component :is="TransitionComponent" :from="transitionFrom">
            <div class="tab-slot" :key="currentTab">
                <template v-for="tab in tabs" :key="tab.id">
                    <slot v-if="currentTab === tab.id" :name="tab.id" />
                </template>
            </div>
        </component>
    </div>
</template>

<style scoped>
.component-tab {
    display: flex;
    .tab-header {
        flex-shrink: 0;
        position: relative;
        display: flex;
        justify-content: v-bind(tabAlignProperty);
        overflow: scroll;
        &:not(.no-separator)::before {
            content: '';
            position: absolute;
            pointer-events: none;
            background-color: var(--color-theme-border);
        }
        :deep(.component-button) {
            height: var(--c-tab-button-height);
            padding: 0 1em;
        }
        .active-border {
            position: absolute;
            pointer-events: none;
            background-color: var(--color-status-brand);
            top: v-bind('`${currentTabClientRects?.top}px`');
            right: v-bind('`${currentTabClientRects?.right}px`');
            bottom: v-bind('`${currentTabClientRects?.bottom}px`');
            left: v-bind('`${currentTabClientRects?.left}px`');
            transition:
                width 0.2s,
                height 0.2s,
                top 0.2s,
                right 0.2s,
                bottom 0.2s,
                left 0.2s;
            z-index: 1;
        }
    }
    .tab-slot {
        overflow-y: auto;
        flex-grow: 1;
        height: 100%;
    }
}

/* ▼ size ▼ */
.large {
    --c-tab-button-height: 40px;
}
.medium {
    --c-tab-button-height: 32px;
}
.small {
    --c-tab-button-height: 24px;
}
/* ▲ size ▲ */

/* ▼ position ▼ */
.top {
    flex-direction: column;
    width: 100%;
    .tab-header {
        &::before {
            top: auto;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
        }
        .active-border {
            top: auto;
            width: v-bind('`${currentTabClientRects?.width}px`');
            height: 2px;
        }
    }
}
.right {
    flex-direction: row-reverse;
    height: 100%;
    .tab-header {
        flex-direction: column;
        &::before {
            right: auto;
            width: 2px;
            height: 100%;
            top: 0;
            left: 0;
        }
        .active-border {
            right: auto;
            width: 2px;
            height: v-bind('`${currentTabClientRects?.height}px`');
        }
    }
}
.bottom {
    flex-direction: column-reverse;
    width: 100%;
    .tab-header {
        &::before {
            bottom: auto;
            width: 100%;
            height: 2px;
            top: 0;
            left: 0;
        }
        .active-border {
            bottom: auto;
            width: v-bind('`${currentTabClientRects?.width}px`');
            height: 2px;
        }
    }
}
.left {
    flex-direction: row;
    height: 100%;
    .tab-header {
        flex-direction: column;
        &::before {
            left: auto;
            width: 2px;
            height: 100%;
            top: 0;
            right: 0;
        }

        .active-border {
            left: auto;
            width: 2px;
            height: v-bind('`${currentTabClientRects?.height}px`');
        }
    }
}
/* ▲ position ▲ */
</style>
