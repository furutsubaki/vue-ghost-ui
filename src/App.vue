<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/organisms/formParts/Button.vue'
import Textarea from './components/organisms/formParts/Textarea.vue'

const model = ref('')
</script>

<template>
  <div>
    <Button>ゴーストボタン</Button>
    <Textarea v-model="model" />{{ model }}
  </div>
</template>

<style scoped></style>
