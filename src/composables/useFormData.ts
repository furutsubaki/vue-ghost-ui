/*
 * ==================================================
 * File Name    plugins/useFormData.ts
 * Description  バリデーション
 * ==================================================
 */

import { computed } from 'vue';
import { useForm } from 'vee-validate';
import type { ZodEffects, ZodObject, ZodRawShape } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export default function (
    schema: ZodEffects<ZodObject<ZodRawShape>> | ZodObject<ZodRawShape>,
    initialValues: { [key: string]: string | number } = {}
) {
    const { handleSubmit, meta, isSubmitting, resetForm } = useForm({
        validationSchema: toTypedSchema(schema),
        initialValues
    });

    const canSubmit = computed(() => !!meta.value.valid && !isSubmitting.value);
    return { handleSubmit, canSubmit, resetForm };
}
