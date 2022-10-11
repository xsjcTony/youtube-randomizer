<script lang="ts" setup>
interface InputProps {
  modelValue: string
}

type InputEvents = (e: 'update:modelValue', value: string) => void


const { modelValue } = defineProps<InputProps>()
const emit = defineEmits<InputEvents>()

const handleInput = (event: Event): void => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
    <input
        :value="modelValue"
        aria-label="Playlist ID"
        type="text"
        class="input border bg-transparent outline-none text-white p-2 flex-1"
        placeholder="Playlist ID"
        @input="handleInput"
    >
</template>

<style lang="scss" scoped>
.input {
    border-image: var(--gradient1-to-right) 1;
}
</style>
