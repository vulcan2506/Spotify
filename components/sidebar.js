import React from 'react'
import {HomeIcon , SearchIcon , LibraryIcon } from '@heroicons/react/outline';
import {signOut , useSession} from 'next-auth/react'
import { useState , useEffect} from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import Link from 'next/link';


function sidebar ()  {
    const spotifyApi = new useSpotify();
    const{ data: session, status} = useSession();
    const [playlists , setPlaylists] = useState([]);
    const [playlistId , setPlaylistsId] = useRecoilState(playlistIdState);
    console.log(playlistId);
     
    console.log(session);
    console.log(playlistIdState);
    useEffect(()=>{
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylists(data.body.items);
            });
        }
        },[session,spotifyApi])

        console.log(playlists);
    
  return (
    <div className=" text-gray-100 p-12 w-15 text-sm border-r overflow-y-scroll scrollbar-hide h-screen border-gray-900 ">
        <div className =' space-y-4'>
        <div>
            <button className='flex items-center space-x-2 hover:text-white  '
            onClick={()=>signOut()} >
        
                <p>Sign Out</p>
            </button>
         </div>

         <div>
            <button className='flex items-center space-x-2 hover:text-white  '>
                <HomeIcon  className="h-5 w-5 text-white-500"/>
                <p>Home</p>
            </button>
         </div>

         <div>
            <button className='flex items-center space-x-2 hover:text-white'>
                <LibraryIcon className="h-5 w-5 text-white-500"/>
                <p>Library Icon</p>
            </button>
         </div>

         <div>
            <button className='flex items-center space-x-2 hover:text-white'>
                <SearchIcon className="h-5 w-5 text-white-500"/>
                <p>Search Icon</p>
            </button>
         </div>
         
           <hr className ='border-t-2px border-gray-500'>
           </hr>
          

           {playlists.map((playlist) => (
            <p key={playlist.id} onClick ={()=>setPlaylistsId(playlist.id)} className="cursor-pointer hover:text-white 
            transition-all duration-150 ease-out">
                {playlist.name}
            </p>
           )
           )}
           
    
    </div>
    </div>
  );
}

export default sidebar