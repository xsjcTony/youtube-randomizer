/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { watch } from 'vue'
import { $$, $ref, $shallowRef } from 'vue/macros'
import type { PlaylistItem } from '@/composables/usePlaylist'
import type { PlayerEmits, PlayerWidth } from '@/types'
import type { Ref } from 'vue'


const usePlayer = (
  playerPlaceholderId: string,
  items: Ref<PlaylistItem[]>,
  width: Ref<PlayerWidth>,
  selectedIndex: Ref<number>,
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
      height: width.value / 16 * 9,
      videoId: items.value[selectedIndex.value].videoId,
      playerVars: {
        autoplay: 1
        // origin: 'http://127.0.0.1:5173' // TODO: change URL when deployed
      },
      events: {
        onStateChange
      }
    })
  })


  // Watchers
  watch(width, width => void player?.setSize(width, width / 16 * 9))

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

    if (event.data === YT.PlayerState.UNSTARTED) {
      skipTimer = window.setTimeout(playNext, SKIP_THRESHOLD)
    } else {
      clearTimeout(skipTimer)
    }
  }

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


  // Skip unavailable video
  let skipTimer: number
  const SKIP_THRESHOLD = 5000
}

export default usePlayer
