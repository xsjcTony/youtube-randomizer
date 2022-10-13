<script lang="ts" setup>
import { readonly, ref } from 'vue'


const playlistId = ref<string>('')
const setPlaylistId = (id: string) => void (playlistId.value = id)

defineExpose({
  playlistId: readonly(playlistId),
  setPlaylistId
})
</script>

<template>
    <input
        v-model.trim="playlistId"
        aria-label="Enter playlist ID"
        type="text"
        class="input border bg-transparent outline-none text-white py-2 px-4 border-gradient-1"
        placeholder="Enter Playlist ID"
    >
</template>
