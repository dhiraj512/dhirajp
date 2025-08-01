'use server';

import { getNowPlaying, getRecentlyPlayed, type NowPlayingResponse, type RecentlyPlayedResponse } from '@/lib/spotify';

export interface NowPlayingTrack {
    isPlaying: boolean;
    title: string;
    artist: string;
    albumImageUrl: string;
    progress: number;
    duration: number;
    songUrl: string;
}

export interface RecentTrack {
    title: string;
    artist: string;
    albumImageUrl: string;
    playedAt: string;
    songUrl: string;
}

export async function getCurrentlyPlaying(): Promise<NowPlayingTrack | null> {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            return null;
        }

        const data: NowPlayingResponse = await response.json();

        if (!data.item) return null;

        return {
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map(artist => artist.name).join(', '),
            albumImageUrl: data.item.album.images[0]?.url || '',
            progress: data.progress_ms || 0,
            duration: data.item.duration_ms,
            songUrl: data.item.external_urls.spotify,
        };
    } catch (error) {
        console.error('Error fetching currently playing track:', error);
        return null;
    }
}

export async function getRecentTrack(): Promise<RecentTrack | null> {
    try {
        const response = await getRecentlyPlayed();

        if (!response.ok) {
            throw new Error('Failed to fetch recently played tracks');
        }

        const data: RecentlyPlayedResponse = await response.json();

        if (!data.items || data.items.length === 0) return null;

        const recentTrack = data.items[0];

        return {
            title: recentTrack.track.name,
            artist: recentTrack.track.artists.map(artist => artist.name).join(', '),
            albumImageUrl: recentTrack.track.album.images[0]?.url || '',
            playedAt: recentTrack.played_at,
            songUrl: recentTrack.track.external_urls.spotify,
        };
    } catch (error) {
        console.error('Error fetching recently played tracks:', error);
        return null;
    }
}