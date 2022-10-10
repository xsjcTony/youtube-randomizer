<script lang="ts" setup>
import usePlaylist from '@/composables/usePlaylist'
import VideoList from '@components/VideoList.vue'


const { error, loading, playlistItems } = usePlaylist()
</script>

<template>
    <h1 class="text-white text-4xl font-bold flex items-center gap-10">
        <img alt="logo" src="/favicon.png" class="w-16">
        <span class="bg-clip-text title leading-normal">Aelita's Youtube Playlist Randomizer</span>
    </h1>
    <VideoList :items="playlistItems" />
</template>

<style scoped>
.title {
    background-image: var(--gradient-1);
    -webkit-text-fill-color: transparent;
}
</style>
