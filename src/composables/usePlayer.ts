/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { watch } from 'vue'
import { $$, $ref, $shallowRef } from 'vue/macros'
import type { PlaylistItem } from '@/composables/usePlaylist'
import type { PlayerEmits, PlayerRatio, PlayerWidth } from '@/types'
import type { Ref } from 'vue'


const calcHeight = (width: number, ratio: PlayerRatio): number => {
  switch (ratio) {
    case '16:9':
      return width / 16 * 9
    case '4:3':
      return width / 4 * 3
  }
}

const usePlayer = (
  playerPlaceholderId: string,
  items: Ref<PlaylistItem[]>,
  selectedIndex: Ref<number>,
  width: Ref<PlayerWidth>,
  ratio: Ref<PlayerRatio>,
  emit: PlayerEmits
): void => {
  // Initialize YouTube Player API
  let iframeAPIReady = $ref<boolean>(false)

  if (!window.YT) {
    window.onYouTubeIframeAPIReady = () => void (iframeAPIReady = true)

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
  } else {
    iframeAPIReady = true
  }


  // Initialize Player
  let player = $shallowRef<YT.Player | null>(null)
  let videoTitle = items.value[selectedIndex.value]?.title

  watch([$$(iframeAPIReady), () => items.value.length], ([apiReady, len]) => {
    if (player || !apiReady || len === 0 || selectedIndex.value >= len) return

    player = new YT.Player('player', {
      width: width.value,
      height: calcHeight(width.value, ratio.value),
      videoId: items.value[selectedIndex.value].videoId,
      playerVars: {
        autoplay: 1,
        origin: 'https://youtube-randomizer.aelita.me/'
      },
      events: {
        onStateChange,
        onError
      }
    })
  })


  // Watchers
  watch([width, ratio], ([width, ratio]) => void player?.setSize(width, calcHeight(width, ratio)))

  watch(selectedIndex, (index) => {
    if (index < items.value.length) {
      player?.loadVideoById(items.value[index].videoId)
      videoTitle = items.value[index].title
      document.title = `0% - ${videoTitle}`
    }
  })

  watch(() => items.value.length, (len) => {
    if (len === 0) {
      player?.destroy()
      player = null
      document.title = 'YouTube Playlist Randomizer'
    } else {
      videoTitle = items.value[selectedIndex.value]?.title
    }
  })


  // Player events
  const onStateChange = (event: YT.OnStateChangeEvent): void => {
    if (event.data === YT.PlayerState.ENDED) {
      playNext()
    }

    if (event.data === YT.PlayerState.PLAYING) {
      timer = window.setInterval(updateTitle, 500)
    } else {
      clearInterval(timer)
    }
  }

  const onError = () => void playNext()

  const playNext = (): void => {
    selectedIndex.value + 1 >= items.value.length
      ? emit('update:selectedIndex', 0)
      : emit('update:selectedIndex', selectedIndex.value + 1)
  }


  // Update title
  let timer: number
  const updateTitle = (): void => {
    // @ts-expect-error NaN -> 0
    const percentage = `${Math.round(player?.getCurrentTime?.() / player?.getDuration?.() * 100 || 0)}%`
    document.title = `${percentage} - ${videoTitle}`
  }
}

export default usePlayer
