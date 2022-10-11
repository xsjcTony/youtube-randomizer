<script lang="ts" setup>
import type { PlaylistItem } from '@/composables/usePlaylist'


interface VideoListProps {
  items: PlaylistItem[]
  selectedIndex: number
}


const { items, selectedIndex } = defineProps<VideoListProps>()
</script>

<template>
    <div class="max-h-96 border border-gray-400 rounded w-2/3 min-w-[700px] overflow-auto custom-scrollbar">
        <div
            v-for="(item, index) in items"
            :id="index"
            :key="index"
            :class="index === selectedIndex && 'bg-gradient-to-r from-gradient2-color-start to-gradient2-color-stop'"
            class="flex odd:bg-[#333] even:bg-[#555] text-white items-center overflow-x-hidden"
        >
            <span class="min-w-[50px] text-center self-stretch inline-flex-center shadow-[2px_0_10px_#00000080]">{{ index + 1 }}</span>
            <span class="py-1 px-4 flex-1 truncate">{{ item.title }}</span>
            <span class="px-2 self-stretch inline-flex-center shadow-[-2px_0_10px_#00000080] italic">{{ item.channel }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>
