import React from 'react'
import useSpotify from './useSpotify'
import { currentTrackIdState } from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useEffect } from 'react';
const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const[songInfo , setSongInfo] = useState(null);
    
    useEffect(() => {
        const  fetchSongInfo = async () => {
            if(currentTrackId)
            {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers:{
                            authorization : `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then((res)=>res.json());
             setSongInfo(trackInfo);
            }

        }
        fetchSongInfo();

    }, [currentTrackId, spotifyApi ]);
    return songInfo
}

export default useSongInfo