<script lang="ts" setup>
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { $$ } from 'vue/macros'
import usePlayer from '@/composables/usePlayer'
import type { PlaylistItem } from '@/composables/usePlaylist'
import type { PlayerRatio, PlayerWidth } from '@/types'
import type { Ref } from 'vue'


interface PlayerProps {
  items: PlaylistItem[]
  selectedIndex: number
  width: PlayerWidth
  ratio: PlayerRatio
}

// Have to redeclare it here because external imported type is not supported for `defineEmits` for now
type PlayerEmits = (e: 'update:selectedIndex', index: number) => number


const { items, selectedIndex, width, ratio } = defineProps<PlayerProps>()
const emit = defineEmits<PlayerEmits>()


usePlayer('player', $$(items) as unknown as Ref<PlaylistItem[]>, $$(selectedIndex), $$(width), $$(ratio), emit)
</script>

<template>
    <div id="player" />
</template>

<style lang="scss" scoped>

</style>
