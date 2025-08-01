import { env } from "./env";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const refresh_token = env.SPOTIFY_CLIENT_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=10';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token,
        }),
    });

    return response.json();
};

export const getNowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const getRecentlyPlayed = async () => {
    const { access_token } = await getAccessToken();

    return fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
        name: string;
        images: Array<{ url: string; height: number; width: number }>;
    };
    external_urls: {
        spotify: string;
    };
    duration_ms: number;
    played_at?: string;
}

export interface NowPlayingResponse {
    is_playing: boolean;
    item: SpotifyTrack | null;
    progress_ms: number;
}

export interface RecentlyPlayedResponse {
    items: Array<{
        track: SpotifyTrack;
        played_at: string;
    }>;
}