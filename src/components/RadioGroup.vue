<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'


type Option = number | string

interface RadioGroupProps {
  options: Option[]
  modelValue: Option
  name?: string
}

type RadioGroupEmits = (e: 'update:modelValue', value: Option) => void


const { options, modelValue, name = uuidv4() } = defineProps<RadioGroupProps>()
const emit = defineEmits<RadioGroupEmits>()

const radioClassName = (option: Option): string =>
  modelValue === option
    ? 'selected text-black border-l-gradient1-color-start'
    : 'border-l-gradient-1-color-middle'

const handleClick = (value: Option): void => {
  emit('update:modelValue', value)
}
</script>

<template>
    <div class="flex border border-gradient-1 text-white font-bold select-none">
        <label
            v-for="(option, index) in options"
            :key="index"
            :class="radioClassName(option)"
            :for="option"
            class="radio inline-flex-center border-l first:border-none cursor-pointer relative isolate"
            @click="handleClick(option)"
            @keyup="handleClick(option)"
        >
            <input
                :name="name"
                :value="option"
                class="invisible absolute"
                type="radio"
            >
            <span class="px-4">{{ option }}</span>
        </label>
    </div>
</template>

<style lang="scss" scoped>
.radio{
    transition: color .5s, text-shadow .5s, border-left-color .5s;

    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        background-image: var(--gradient1-to-right);
        opacity: 0;
        transition: opacity .5s;
        inset: 0;
    }

    &:not(.selected):hover {
        color: var(--gradient1-color-start);
        text-shadow: 0 0 10px var(--gradient1-color-start);
    }

    &.selected {
        &::before {
            opacity: 1;
        }

        & + .radio {
            border-left-color: var(--gradient1-color-stop);
        }
    }
}
</style>
