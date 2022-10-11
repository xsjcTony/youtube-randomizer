/* eslint-disable @typescript-eslint/no-loop-func */

import { watch } from 'vue'
import { $$, $ref } from 'vue/macros'
import { camelToSentence } from '@/utils'
import type { Ref } from 'vue'


/**
 * Types
 */
interface Thumbnail {
  url: string
  width: number
  height: number
}

interface YoutubePlaylistItem {
  kind: 'youtube#playlistItem'
  etag: string
  id: string
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      'default': Thumbnail
      high: Thumbnail
      maxres: Thumbnail
      medium: Thumbnail
      standard: Thumbnail
    }
    channelTitle: string
    videoOwnerChannelTitle: string
    videoOwnerChannelId: string
    playlistId: string
    position: number
    resourceId: {
      kind: string
      videoId: string
    }
  }
}

interface YoutubePlaylistItemsResponse {
  kind: 'youtube#playlistItemListResponse'
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: YoutubePlaylistItem[]
}

interface YoutubePlaylistItemsError {
  error: {
    errors: {
      domain: string
      reason: 'channelClosed' | 'channelNotFound' | 'channelSuspended' | 'playlistForbidden' | 'playlistNotFound' | 'playlistOperationUnsupported'
      message: string
      locationType: string
      location: string
    }[]
    code: 400 | 403 | 404
    message: string
  }
}

export interface PlaylistItem {
  title: string
  videoId: string
  channel: string
}


/**
 * Content
 */
const apiKey = 'AIzaSyDxh0BAAm28Fi-eXyDUgNj3bnh4wS978g0'

const usePlaylist = (playlistId: Ref<string>): {
  loading: Ref<boolean>
  error: Ref<string | null>
  playlistItems: Ref<PlaylistItem[]>
} => {
  let loading = $ref<boolean>(false)
  let error = $ref<string | null>(null)
  const playlistItems = $ref<PlaylistItem[]>([])

  let nextPageToken = $ref<string | null>(null)

  const fetchPlaylist = async (): Promise<void> => {
    const params = new URLSearchParams({
      key: apiKey,
      maxResults: '50',
      part: 'snippet',
      pageToken: nextPageToken ?? ''
    })

    // Prevent `&` and `=` in `playlistId` being encoded by `URLSearchParams` (for refresh)
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}&playlistId=${playlistId.value}`

    try {
      const res: YoutubePlaylistItemsError | YoutubePlaylistItemsResponse = await (await fetch(url, {
        method: 'GET'
      })).json()

      if ('error' in res) {
        error = camelToSentence(res.error.errors[0].reason)
        nextPageToken = null
        loading = false
        return
      }

      res.items.map((item) => {
        if (['Deleted video', 'Private video'].includes(item.snippet.title)) return

        playlistItems.push({
          title: item.snippet.title,
          videoId: item.snippet.resourceId.videoId,
          channel: item.snippet.videoOwnerChannelTitle
        })
      })

      if (res.nextPageToken) {
        nextPageToken = res.nextPageToken
      } else {
        nextPageToken = null
        loading = false
      }
    } catch (err) {
      error = `${err instanceof Error ? err.message : 'Internal Error'}, contact xsjcTony@gmail.com`
      nextPageToken = null
      loading = false
    }
  }

  watch(playlistId, () => {
    error = null
    loading = true
    playlistItems.length = 0
    void fetchPlaylist()
  })

  watch($$(nextPageToken), (token) => {
    if (token !== null) void fetchPlaylist()
  })

  return $$({
    loading,
    error,
    playlistItems
  })
}

export default usePlaylist
