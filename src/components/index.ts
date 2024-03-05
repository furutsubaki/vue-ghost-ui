import MiAvatar from '@/components/basic/Avatar.vue';
import MiButton from '@/components/basic/Button.vue';
import MiAutocomplete from '@/components/controls/Autocomplete.vue';
import MiCheckbox from '@/components/controls/Checkbox.vue';
import MiCheckboxGroup from '@/components/controls/CheckboxGroup.vue';
import MiDatePicker from '@/components/controls/DatePicker.vue';
import MiField from '@/components/controls/Field.vue';
import MiRadio from '@/components/controls/Radio.vue';
import MiRadioGroup from '@/components/controls/RadioGroup.vue';
import MiSelect from '@/components/controls/Select.vue';
import MiSwitch from '@/components/controls/Switch.vue';
import MiTextarea from '@/components/controls/Textarea.vue';
import MiAlert from '@/components/feedback/Alert.vue';
import MiBadge from '@/components/feedback/Badge.vue';
import MiDialog from '@/components/feedback/Dialog.vue';
import MiDrawer from '@/components/feedback/Drawer.vue';
import MiNotificationItem from '@/components/feedback/NotificationItem.vue';
import MiNotifications from '@/components/feedback/Notifications.vue';
import MiProgress from '@/components/feedback/Progress.vue';
import MiRating from '@/components/feedback/Rating.vue';
import MiFrame from '@/components/frame/Frame.vue';
import MiPictureFrame from '@/components/frame/PictureFrame.vue';
import MiFieldAccordionList from '@/components/inner-parts/FieldAccordionList.vue';
import MiFieldFrame from '@/components/inner-parts/FieldFrame.vue';
import MiInputTextCounter from '@/components/inner-parts/InputTextCounter.vue';
import MiOpacityTransition from '@/components/inner-parts/OpacityTransition.vue';
import MiTranslateTransition from '@/components/inner-parts/TranslateTransition.vue';
import MiBottomNav from '@/components/navigation/BottomNav.vue';
import MiBreadcrumb from '@/components/navigation/Breadcrumb.vue';
import MiPagination from '@/components/navigation/Pagination.vue';

export {
    MiAvatar,
    MiButton,
    MiAutocomplete,
    MiCheckbox,
    MiCheckboxGroup,
    MiDatePicker,
    MiField,
    MiRadio,
    MiRadioGroup,
    MiSelect,
    MiSwitch,
    MiTextarea,
    MiAlert,
    MiBadge,
    MiDialog,
    MiDrawer,
    MiNotificationItem,
    MiNotifications,
    MiProgress,
    MiRating,
    MiFrame,
    MiPictureFrame,
    MiFieldAccordionList,
    MiFieldFrame,
    MiInputTextCounter,
    MiOpacityTransition,
    MiTranslateTransition,
    MiBottomNav,
    MiBreadcrumb,
    MiPagination
};

declare module 'vue' {
    interface GlobalComponents {
        MiAvatar: typeof MiAvatar;
        MiButton: typeof MiButton;
        MiAutocomplete: typeof MiAutocomplete;
        MiCheckbox: typeof MiCheckbox;
        MiCheckboxGroup: typeof MiCheckboxGroup;
        MiDatePicker: typeof MiDatePicker;
        MiField: typeof MiField;
        MiRadio: typeof MiRadio;
        MiRadioGroup: typeof MiRadioGroup;
        MiSelect: typeof MiSelect;
        MiSwitch: typeof MiSwitch;
        MiTextarea: typeof MiTextarea;
        MiAlert: typeof MiAlert;
        MiBadge: typeof MiBadge;
        MiDialog: typeof MiDialog;
        MiDrawer: typeof MiDrawer;
        MiNotificationItem: typeof MiNotificationItem;
        MiNotifications: typeof MiNotifications;
        MiProgress: typeof MiProgress;
        MiRating: typeof MiRating;
        MiFrame: typeof MiFrame;
        MiPictureFrame: typeof MiPictureFrame;
        MiFieldAccordionList: typeof MiFieldAccordionList;
        MiFieldFrame: typeof MiFieldFrame;
        MiInputTextCounter: typeof MiInputTextCounter;
        MiOpacityTransition: typeof MiOpacityTransition;
        MiTranslateTransition: typeof MiTranslateTransition;
        MiBottomNav: typeof MiBottomNav;
        MiBreadcrumb: typeof MiBreadcrumb;
        MiPagination: typeof MiPagination;
    }
}
