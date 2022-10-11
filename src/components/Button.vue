<template>
    <a class="py-2 px-4 border button text-white hover:text-black font-bold relative isolate cursor-pointer">
        <slot />
    </a>
</template>

<style lang="scss" scoped>
.button {
    border-image: var(--gradient1-to-right) 1;
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
