<script lang="ts" setup>
import { $, $$, $ref } from 'vue/macros'
import usePlaylist from '@/composables/usePlaylist'
import LoadingImg from '@assets/images/loading.svg'
import Button from '@components/Button.vue'
import Input from '@components/Input.vue'
import RadioGroup from '@components/RadioGroup.vue'
import VideoList from '@components/VideoList.vue'


type VideoWidth = 360 | 480 | 720 | 1080


let selectedIndex = $ref<number>(0)
let playlistId = $ref<string>('')
let { error, loading, playlistItems } = $(usePlaylist($$(playlistId)))


// iFrame size
const videoWidth = $ref<VideoWidth>(360)
const videoWidthOptions: VideoWidth[] = [360, 480, 720, 1080]


// Input
const inputRef = $ref<InstanceType<typeof Input> | null>(null)


// Button event handlers
const handleShuffleClick = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (loading) return

  if (!inputRef || !inputRef.playlistId) {
    error = `Please enter playlist's ID`
    return
  }

  selectedIndex = 0

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  playlistId = `${inputRef?.playlistId}&t=${Date.now()}`
}
</script>

<template>
    <h1 class="text-white text-4xl font-bold flex items-center gap-10">
        <img alt="logo" class="w-12" src="/favicon.png">
        <span class="bg-clip-text title leading-normal bg-gradient-to-r from-gradient1-color-start to-gradient1-color-stop text-fill-transparent">
            Youtube Playlist Randomizer
        </span>
    </h1>

    <h2>iframe here</h2>

    <div class="flex justify-between w-full">
        <RadioGroup v-model="videoWidth" :options="videoWidthOptions" name="videoWidth" />
        <div class="flex gap-5">
            <Button>Previous</Button>
            <Button>Next</Button>
        </div>
        <Button>Bookmark</Button>
    </div>

    <div class="flex w-full gap-5">
        <Input ref="inputRef" class="flex-1" />
        <LoadingImg v-show="loading" class="text-gradient1-color-middle w-8 animate-spin" />
        <Button :disabled="loading" @click="handleShuffleClick">Shuffle</Button>
    </div>

    <VideoList v-model:selected-index="selectedIndex" :items="playlistItems" :loading="loading" />

    <div v-if="error" class="text-red-500 text-xl">
        <span class="font-bold select-none">ERROR - </span>{{ error }}
    </div>
</template>
