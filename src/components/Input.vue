<script lang="ts" setup>
import { ref } from 'vue'


const playlistId = ref<string>('')

defineExpose({ playlistId })
</script>

<template>
    <input
        v-model.trim="playlistId"
        aria-label="Enter playlist ID"
        type="text"
        class="input border bg-transparent outline-none text-white py-2 px-4 flex-1 border-gradient-1"
        placeholder="Enter Playlist ID"
    >
</template>
