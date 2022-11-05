import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import useSpotify from '../hooks/useSpotify'
import { isPlayingState  } from '../atoms/songAtom'
import { currentTrackIdState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'
import useSongInfo from '../hooks/useSongInfo'
import { useEffect } from 'react'
import { useState } from 'react'
import { PauseIcon, PlayIcon ,RewindIcon, SwitchHorizontalIcon, VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid'
import { debounce } from 'lodash'

const player = () => {
    const spotifyApi = useSpotify()
    const{data: session, status} = useSession()
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () =>{
        if(!songInfo)
        { 
            spotifyApi.getMyCurrentPlayingTrack().then((data)=>{
                setCurrentTrackId(data.body?.item?.id);
            
            spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                setIsPlaying(data.body?.is_playing);
            })
        })
        }
    }
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }

        })
    }
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId)
        {
            fetchCurrentSong()
            setVolume(50);
        }
        
    
    }, [currentTrackIdState,spotifyApi,session]);

    useEffect(()=>{
          if(volume>0 && volume<100)
          {
            debounceAdjustVolume(volume)
          }
    },[volume])

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume)
        },800),[]
    );

  return (
    <div className=' h-24 bg-gradient-to-r from-blue-600 to via-gray-900 text-white flex items-center '>
        <div>
        <img className='h-15 w-12 rounded-full p-2 m-3'
            src={songInfo?.album.images?.[0]?.url}/>
        </div>
        <div className='text-bold'>
            <h3 >{songInfo?.name}</h3>
            <p >{songInfo?.artists?.[0]?.name}</p>
        </div>
        <div className="flex items-center p-8">
            
            <SwitchHorizontalIcon className='btn2 h-6 w-7'/>
            <RewindIcon className='btn2 h-6 w-7'/>
            {isPlaying?(
                   <PauseIcon onClick={handlePlayPause} className='btn2 h-6 w-7'/>
            ):(
                  <PlayIcon onClick={handlePlayPause} className="btn2 h-6 w-7" />
            )}
        </div>
        <div>
        <div className='flex items-center space-x-3 md:space-x-4 justify-center pr-5'>
        <VolumeOffIcon onClick={()=> volume>0 && setVolume(volume-10)} className="btn2 h-5 w-5"/>
        <input className='btn' type="range" value={volume} 
        onChange={(e)=>setVolume(Number(e.target.value))} min={0} max={100}/>
        <VolumeUpIcon onClick={()=> volume<100 && setVolume(volume+10)} className='btn2 h-5 w-5'/>
        </div>
    </div>
    </div>
  )
}

export default player