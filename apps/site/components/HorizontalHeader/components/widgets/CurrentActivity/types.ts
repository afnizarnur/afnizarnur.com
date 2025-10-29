export type ContentType = "spotify" | "games"

export interface SpotifyData {
    isPlaying: boolean
    title: string
    artist: string
    albumArt?: string
    songUrl?: string
}

export interface CachedSpotifyData extends SpotifyData {
    timestamp: number
}

export interface GameData {
    name: string
    playtime: string
    icon?: string
}

export interface CurrentActivityProps {
    title?: string
    artist?: string
    albumArt?: string
    isPlaying?: boolean
}

export interface Bar {
    chars: string[]
    height: number
}

export interface JetPlane {
    x: number
    y: number
    direction: 1 | -1 // 1 = right, -1 = left
}

export interface Bullet {
    x: number
    y: number
    id: number
}

export interface Asteroid {
    char: string
    x: number
    y: number
    speed: number
    id: number
    size: "small" | "medium" | "large"
}

export interface Explosion {
    x: number
    y: number
    id: number
    frame: number
}

export interface CurrentActivityState {
    contentType: ContentType
    animationTrigger: number
}
