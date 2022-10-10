<script lang="ts" setup>
import type { PlaylistItem } from '@/composables/usePlaylist'


interface VideoListProps {
  items: PlaylistItem[]
}


const { items } = defineProps<VideoListProps>()
</script>

<template>
    <div class="max-h-96 border border-[#ffc0cb] rounded w-1/2 min-w-[700px] overflow-auto">
        <div v-for="(item, index) in items" :key="index" class="flex">
            <span class="border min-w-[50px] text-center">{{ index + 1 }}</span>
            <span>{{ item.title }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
