<script lang="ts" setup>
import { useLocalStorage, useUrlSearchParams } from '@vueuse/core'
import { onMounted } from 'vue'
import { $, $$, $ref } from 'vue/macros'
import usePlaylist from '@/composables/usePlaylist'
import LoadingImg from '@assets/images/loading.svg'
import Button from '@components/Button.vue'
import Input from '@components/Input.vue'
import Player from '@components/Player.vue'
import RadioGroup from '@components/RadioGroup.vue'
import VideoList from '@components/VideoList.vue'
import type { PlayerRatio, PlayerWidth } from '@/types'


let selectedIndex = $ref<number>(0)
let playlistId = $ref<string>('')
let { error, loading, playlistItems } = $(usePlaylist($$(playlistId)))


// iframe
const videoWidth = useLocalStorage<PlayerWidth>('videoWidth', 720)
const videoWidthOptions: PlayerWidth[] = [360, 480, 720, 1080]

const videoRatio = useLocalStorage<PlayerRatio>('videoRatio', '16:9')
const videoRatioOptions: PlayerRatio[] = ['16:9', '4:3']


// Input
const inputRef = $ref<InstanceType<typeof Input> | null>(null)


// Load from URLSearchParams
const urlParams = useUrlSearchParams('history')
onMounted(() => {
  if (!inputRef) return

  const pid = urlParams.pid
  if (pid && typeof pid === 'string') {
    inputRef.setPlaylistId(pid)
    playlistId = pid
  }
})


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
  playlistId = `${inputRef.playlistId}&t=${Date.now()}`
  urlParams.pid = inputRef.playlistId
}

const handlePreviousClick = () => void selectedIndex--

const handleNextClick = (): void => {
  selectedIndex + 1 >= playlistItems.length
    ? selectedIndex = 0
    : selectedIndex++
}

const handleBookmarkClick = () => void alert('Please press Ctrl+D / Command+D to bookmark this page')
</script>

<template>
    <h1 class="text-white text-4xl font-bold flex items-center gap-10">
        <img alt="logo" class="w-12" src="/favicon.png">
        <span class="bg-clip-text title leading-normal bg-gradient-to-r from-gradient1-color-start to-gradient1-color-stop text-fill-transparent">
            YouTube Playlist Randomizer
        </span>
    </h1>

    <Player
        v-model:selected-index="selectedIndex"
        :items="playlistItems"
        :width="videoWidth"
        :ratio="videoRatio"
    />

    <div class="flex justify-between w-full">
        <RadioGroup v-model="videoWidth" :options="videoWidthOptions" name="videoWidth" />
        <RadioGroup v-model="videoRatio" :options="videoRatioOptions" name="videoRatio" />
        <div class="flex gap-2">
            <Button
                :disabled="playlistItems.length === 0 || selectedIndex === 0"
                @click="handlePreviousClick"
            >
                Previous
            </Button>
            <Button
                :disabled="playlistItems.length === 0"
                @click="handleNextClick"
            >
                Next
            </Button>
        </div>
        <Button @click="handleBookmarkClick">Bookmark</Button>
    </div>

    <div class="flex w-full gap-5">
        <Input ref="inputRef" class="flex-1" />
        <LoadingImg v-show="loading" class="text-gradient1-color-middle w-8 animate-spin" />
        <Button :disabled="loading" @click="handleShuffleClick">Shuffle</Button>
    </div>

    <VideoList v-model:selected-index="selectedIndex" :items="playlistItems" :loading="loading" />

    <div class="text-red-500 text-xl flex-1">
        <span v-if="error"><span class="font-bold select-none">ERROR - </span>{{ error }}</span>
    </div>

    <footer class="text-gray-400 text-1xl leading-loose">
        &copy; Aelita 2022 -
        <a
            class="underline underline-offset-2"
            href="https://github.com/xsjcTony"
            rel="noreferrer noopener"
            target="_blank"
        >
            GitHub <span class="font-mono">&UpperRightArrow;</span>
        </a>
        -
        <a
            class="underline underline-offset-2"
            href="mailto:xsjcTony@gmail.com?subject=Message from {{ your_name }} - Youtube Playlist Randomizer"
            title="Contact me"
        >
            Contact <span class="font-mono">&#9993;</span>
        </a>
        -
        <a
            class="underline underline-offset-2"
            href="https://aelita.me/"
            rel="noreferrer noopener"
            target="_blank"
        >
            Home <span class="font-mono">&UpperRightArrow;</span>
        </a>
    </footer>
</template>
