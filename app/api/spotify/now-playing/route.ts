import { NextResponse } from "next/server"

const SPOTIFY_NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const CACHE_DURATION_MS = 60 * 1000

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

// In-memory cache
let cachedNowPlaying: any = null
let cacheTimestamp: number = 0

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }),
  })

  return response.json()
}

async function getNowPlaying() {
  const { access_token } = await getAccessToken()

  return fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

function isCacheValid() {
  return Date.now() - cacheTimestamp < CACHE_DURATION_MS
}

export async function GET() {
  try {
    // Check if cache is valid
    if (cachedNowPlaying && isCacheValid()) {
      return NextResponse.json(cachedNowPlaying)
    }

    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      cachedNowPlaying = { isPlaying: false }
      cacheTimestamp = Date.now()
      return NextResponse.json(cachedNowPlaying)
    }

    const song = await response.json()

    if (!song.item) {
      cachedNowPlaying = { isPlaying: false }
      cacheTimestamp = Date.now()
      return NextResponse.json(cachedNowPlaying)
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ")
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify

    cachedNowPlaying = {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
    }
    cacheTimestamp = Date.now()

    return NextResponse.json(cachedNowPlaying)
  } catch (error) {
    console.error("[v0] Spotify API error:", error)
    return NextResponse.json({ isPlaying: false, error: "Failed to fetch" })
  }
}
