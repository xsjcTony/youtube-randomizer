<script lang="ts" setup>
import { watchEffect } from 'vue'
import { $ref } from 'vue/macros'
import type { PlaylistItem } from '@/composables/usePlaylist'


interface VideoListProps {
  items: PlaylistItem[]
  selectedIndex: number
}

type VideoListEmits = (e: 'update:selectedIndex', index: number) => number


const { items, selectedIndex } = defineProps<VideoListProps>()
const emit = defineEmits<VideoListEmits>()

const handleVideoClick = (index: number): void => {
  emit('update:selectedIndex', index)
}

const videoListRef = $ref<HTMLElement | null>(null)

watchEffect(() => {
  if (!videoListRef) return

  videoListRef.children[selectedIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
})
</script>

<template>
    <div
        ref="videoListRef"
        class="max-h-96 border border-gray-400 rounded-l w-2/3 min-w-[700px] overflow-auto custom-scrollbar"
    >
        <div
            v-for="(item, index) in items"
            :key="index"
            :class="index === selectedIndex && 'bg-gradient-to-r from-gradient2-color-start to-gradient2-color-stop'"
            class="flex odd:bg-[#333] even:bg-[#555] text-white overflow-x-hidden"
            @click="handleVideoClick(index)"
            @keyup="handleVideoClick(index)"
        >
            <span class="min-w-[50px] text-center inline-flex-center shadow-[2px_0_10px_#00000080]">{{ index + 1 }}</span>
            <span class="py-1 px-4 flex-1 truncate">{{ item.title }}</span>
            <span class="px-3 inline-flex-center shadow-[-2px_0_10px_#00000080] italic">{{ item.channel }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
