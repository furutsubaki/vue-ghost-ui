import { ref, type Directive } from 'vue';

export default function () {
    const callback = ref<Function>(() => {});
    const options = ref<{
        handler: Function;
        isActive: boolean;
        ignore: Element[];
    }>({
        handler: () => {},
        isActive: true,
        ignore: []
    });
    const onOutsideClick = (event: Event) => {
        const isActive = options.value.isActive;
        if (!isActive) {
            return;
        }

        const ignore = options.value.ignore;
        const hasIgnoreElement = ignore.length
            ? ignore.find((ignore) => {
                  if (typeof ignore === 'string') {
                      const nodes = document.querySelectorAll(ignore);
                      return Array.from<Element>(nodes).find((node) =>
                          node.contains(event.target as Node)
                      );
                  } else {
                      return ignore.contains(event.target as Node);
                  }
              })
            : false;
        if (hasIgnoreElement) {
            return;
        }

        callback.value(event);
    };

    const vOutsideClick: Directive = {
        mounted: (_, binding) => {
            if (typeof binding.value === 'function') {
                callback.value = binding.value as Function;
            } else if (typeof binding.value === 'object') {
                callback.value = binding.value.handler as Function;
                options.value = { ...options.value, ...binding.value };
            }
            window.addEventListener('click', onOutsideClick);
        },
        beforeUnmount: () => {
            window.removeEventListener('click', onOutsideClick);
        },
        updated: (_, binding) => {
            if (typeof binding.value === 'object') {
                options.value = { ...options.value, ...binding.value };
            }
        }
    };

    return { vOutsideClick };
}
