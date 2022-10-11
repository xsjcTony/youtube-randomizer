<script lang="ts" setup>
import { $$, $ref } from 'vue/macros'
import usePlaylist from '@/composables/usePlaylist'
import Button from '@components/Button.vue'
import Input from '@components/Input.vue'
import VideoList from '@components/VideoList.vue'


const selectedIndex = $ref<number>(0)
const playlistId = $ref<string>('')
const playlistIdForRequest = $ref<string>('')
const { error, loading, playlistItems } = usePlaylist($$(playlistIdForRequest))
</script>

<template>
    <h1 class="text-white text-4xl font-bold flex items-center gap-10">
        <img alt="logo" src="/favicon.png" class="w-12">
        <span class="bg-clip-text title leading-normal bg-gradient-to-r from-gradient1-color-start to-gradient1-color-stop">Aelita's Youtube Playlist Randomizer</span>
    </h1>

    <h2>iframe here</h2>

    <div>Buttons</div>

    <div class="flex w-2/3 min-w-[700px] gap-10">
        <Input v-model="playlistId" />
        <Button @click="playlistIdForRequest = playlistId">Shuffle</Button>
    </div>

    <VideoList v-model:selected-index="selectedIndex" :items="playlistItems" />

    <div>{{ error }} {{ loading }}</div>
</template>

<style scoped>
.title {
    -webkit-text-fill-color: transparent;
}
</style>
