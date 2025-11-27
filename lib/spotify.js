import { getSession } from "next-auth/react";

const BASE_URL = 'https://api.spotify.com/v1';

// A wrapper to handle all Spotify API requests
const spotifyFetch = async (url, method = 'GET', body = null) => {
    const session = await getSession();

    if (!session || !session.user.accessToken) {
        throw new Error('No active session or access token available.');
    }

    const response = await fetch(url, {
        method,
        headers: {
            'Authorization': `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`);
    }

    return response.status === 204 ? null : response.json();
};

// Functions for the Playlist Generator:
export const getUserTopTracks = async (limit = 5) => {
    return spotifyFetch(`${BASE_URL}/me/top/tracks?limit=${limit}`);
};

export const getRecommendations = async (seedTracks, targetAttributes) => {
    const params = new URLSearchParams({
        limit: 50, 
        seed_tracks: seedTracks.join(','),
        ...targetAttributes, 
    });
    return spotifyFetch(`${BASE_URL}/recommendations?${params.toString()}`);
};

export const createPlaylist = async (userId, playlistName, description) => {
    return spotifyFetch(
        `${BASE_URL}/users/${userId}/playlists`,
        'POST',
        { name: playlistName, description, public: false }
    );
};

export const addTracksToPlaylist = async (playlistId, trackUris) => {
    return spotifyFetch(
        `${BASE_URL}/playlists/${playlistId}/tracks`,
        'POST',
        { uris: trackUris }
    );
};

export const getCurrentUserProfile = async () => {
    return spotifyFetch(`${BASE_URL}/me`);
};
