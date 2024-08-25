/*
 * ==================================================
 * File Name    composables/useFormData.ts
 * Description  バリデーション
 * ==================================================
 */

import { computed } from 'vue';
import { useForm } from 'vee-validate';
import type { ZodEffects, ZodObject, ZodRawShape } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export default function (
    schema: ZodEffects<ZodObject<ZodRawShape>> | ZodObject<ZodRawShape>,
    initialValues: { [key: string]: any } = {}
) {
    const { handleSubmit, meta, isSubmitting, resetForm, values, setFieldValue, setValues } =
        useForm({
            validationSchema: toTypedSchema(schema),
            initialValues
        });

    const canSubmit = computed(() => !!meta.value.valid && !isSubmitting.value);
    return { handleSubmit, canSubmit, resetForm, values, setFieldValue, setValues };
}
