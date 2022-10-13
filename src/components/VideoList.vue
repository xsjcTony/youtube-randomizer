<script lang="ts" setup>
import { watch } from 'vue'
import { $$, $ref } from 'vue/macros'
import EmptyImg from '@assets/images/empty.svg'
import type { PlaylistItem } from '@/composables/usePlaylist'


interface VideoListProps {
  items: PlaylistItem[]
  selectedIndex: number
  loading: boolean
}

type VideoListEmits = (e: 'update:selectedIndex', index: number) => number


const { items, selectedIndex, loading } = defineProps<VideoListProps>()
const emit = defineEmits<VideoListEmits>()

const handleVideoClick = (index: number): void => {
  if (loading) return
  emit('update:selectedIndex', index)
}

const videoListRef = $ref<HTMLElement | null>(null)

watch($$(selectedIndex), (index) => {
  const len = items.length
  if (!videoListRef || len === 0 || selectedIndex >= len) return

  videoListRef.children[index].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
})
</script>

<template>
    <div
        ref="videoListRef"
        class="min-h-[24rem] h-96 resize-y border border-gradient-1 w-full overflow-auto custom-scrollbar text-white"
        :class="{ 'flex justify-center items-center': items.length === 0 }"
    >
        <div v-if="items.length === 0" class="text-gray-400 font-bold flex-col flex items-center gap-2 text-xl select-none">
            <EmptyImg />
            NO DATA
        </div>
        <div
            v-for="(item, index) in items"
            v-else
            :key="index"
            :class="index === selectedIndex && 'bg-gradient-to-r from-gradient2-color-start to-gradient2-color-stop'"
            class="flex odd:bg-[#333] even:bg-[#555] overflow-x-hidden"
            @click="handleVideoClick(index)"
            @keyup="handleVideoClick(index)"
        >
            <span class="min-w-[50px] text-center inline-flex-center shadow-[2px_0_10px_#00000080]">{{ index + 1 }}</span>
            <span class="py-1 px-4 flex-1 truncate">{{ item.title }}</span>
            <span class="px-3 inline-flex-center shadow-[-2px_0_10px_#00000080] italic">{{ item.channel }}</span>
        </div>
    </div>
</template>
