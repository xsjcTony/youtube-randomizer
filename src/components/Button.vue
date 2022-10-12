<script lang="ts" setup>
import { computed } from 'vue'


interface ButtonProps {
  disabled?: boolean
}


const { disabled = false } = defineProps<ButtonProps>()

const className = computed(() =>
  disabled
    ? 'disabled border-gray-400 cursor-not-allowed text-gray-400'
    : 'border-gradient-1 cursor-pointer text-white hover:text-black'
)
</script>

<template>
    <a
        class="py-2 px-4 border button font-bold relative isolate select-none"
        :class="className"
    >
        <slot />
    </a>
</template>

<style lang="scss" scoped>
.button:not(.disabled) {
    transition: color .5s;

    &::before {
        content: '';
        position: absolute;
        z-index: -1;
        background-image: var(--gradient1-to-right);
        opacity: 0;
        transition: opacity .5s;
        inset: 0;
    }

    &:hover::before {
        opacity: 1;
    }
}
</style>
