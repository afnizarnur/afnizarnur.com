/**
 * Spotify API Types
 *
 * Type definitions for Spotify Web API responses
 * @see https://developer.spotify.com/documentation/web-api
 */

export interface SpotifyImage {
    url: string
    height: number
    width: number
}

export interface SpotifyArtist {
    name: string
    external_urls: {
        spotify: string
    }
}

export interface SpotifyAlbum {
    name: string
    images: SpotifyImage[]
    external_urls: {
        spotify: string
    }
}

export interface SpotifyTrack {
    id: string
    name: string
    artists: SpotifyArtist[]
    album: SpotifyAlbum
    external_urls: {
        spotify: string
    }
    duration_ms: number
}

export interface SpotifyRecentlyPlayedResponse {
    items: Array<{
        track: SpotifyTrack
        played_at: string
    }>
}

export interface SpotifyTokenResponse {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
}

export interface NowPlayingData {
    isPlaying: boolean
    title: string
    artist: string
    albumArt?: string
    songUrl?: string
}
