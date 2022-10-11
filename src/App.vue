<script lang="ts" setup>
import { $ref } from 'vue/macros'
import usePlaylist from '@/composables/usePlaylist'
import VideoList from '@components/VideoList.vue'


const { error, loading, playlistItems } = usePlaylist()
const selectedIndex = $ref<number>(0)
</script>

<template>
    <h1 class="text-white text-4xl font-bold flex items-center gap-10">
        <img alt="logo" src="/favicon.png" class="w-12">
        <span class="bg-clip-text title leading-normal bg-gradient-to-r from-gradient1-color-start to-gradient1-color-stop">Aelita's Youtube Playlist Randomizer</span>
    </h1>
    <VideoList v-model:selected-index="selectedIndex" :items="playlistItems" />
</template>

<style scoped>
.title {
    -webkit-text-fill-color: transparent;
}
</style>
