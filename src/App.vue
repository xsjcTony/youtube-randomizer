<script lang="ts" setup>
import { $, $$, $ref } from 'vue/macros'
import usePlaylist from '@/composables/usePlaylist'
import Button from '@components/Button.vue'
import Input from '@components/Input.vue'
import VideoList from '@components/VideoList.vue'


let selectedIndex = $ref<number>(999)
let playlistId = $ref<string>('')
let { error, loading, playlistItems } = $(usePlaylist($$(playlistId)))

const inputRef = $ref<InstanceType<typeof Input> | null>(null)

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
            Aelita's Youtube Playlist Randomizer
        </span>
    </h1>

    <h2>iframe here</h2>

    <div>Buttons</div>

    <div class="flex w-2/3 min-w-[700px] gap-10">
        <Input ref="inputRef" />
        <Button :disabled="loading" @click="handleShuffleClick">Shuffle</Button>
    </div>

    <VideoList v-model:selected-index="selectedIndex" :items="playlistItems" />

    <div v-if="error" class="text-red-500 text-xl">
        <span class="font-bold select-none">ERROR - </span>{{ error }}
    </div>
</template>
