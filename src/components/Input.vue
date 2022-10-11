<script lang="ts" setup>
import { ref } from 'vue'


const playlistId = ref<string>('')

defineExpose({ playlistId })
</script>

<template>
    <input
        v-model="playlistId"
        aria-label="Enter playlist ID"
        type="text"
        class="input border bg-transparent outline-none text-white p-2 flex-1"
        placeholder="Enter Playlist ID"
    >
</template>

<style lang="scss" scoped>
.input {
    border-image: var(--gradient1-to-right) 1;
}
</style>
