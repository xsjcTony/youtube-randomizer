/* eslint-disable @typescript-eslint/no-loop-func */

import { watch } from 'vue'
import { $$, $ref } from 'vue/macros'
import type { Ref } from 'vue'


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

export interface PlaylistItem {
  title: string
  videoId: string
  channel: string
}


const apiKey = 'AIzaSyDxh0BAAm28Fi-eXyDUgNj3bnh4wS978g0'

const usePlaylist = (): {
  loading: Ref<boolean>
  error: Ref<boolean>
  playlistItems: Ref<PlaylistItem[]>
} => {
  let loading = $ref<boolean>(true)
  let error = $ref<boolean>(false)
  const playlistItems = $ref<PlaylistItem[]>([])

  let nextPageToken = $ref<string | null>(null)

  const fetchPlaylist = async (): Promise<void> => {
    const params = new URLSearchParams({
      key: apiKey,
      playlistId: 'PLy4WqzX2UiYNa2IIo4wD2X3ujAM0RfUCH',
      maxResults: '50',
      part: 'snippet',
      pageToken: nextPageToken ?? ''
    })

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`
    console.log(url)

    try {
      const res: YoutubePlaylistItemsResponse = await (await fetch(url, {
        method: 'GET'
      })).json()

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
      error = true
      nextPageToken = null
    }
  }

  void fetchPlaylist()

  watch($$(nextPageToken), (token) => {
    if (token !== null) { void fetchPlaylist() }
  })

  return $$({
    loading,
    error,
    playlistItems
  })
}

export default usePlaylist
