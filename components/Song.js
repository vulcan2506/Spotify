import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from '../lib/time';
import { currentTrackIdState } from '../atoms/songAtom';
import { isPlayingState } from '../atoms/songAtom';
function Song ({ order , track })  {
    const spotifyApi = useSpotify();
    const[currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [playing, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () =>{
               setCurrentTrackId(track.track.id);
               setIsPlaying(true);
               spotifyApi.play({
                uris: [track.track.uri],
               })
}

   
  return (
   <div className="grid grid-cols-2 py-4 px-5 hover:bg-gradient-to-b from-red-500 to-red-900 rounded-lg cursor-pointer btn" onClick={playSong}>
        <div className="flex items-center space-x-4 ">
            <p> {order + 1} </p>
            <img className=" rounded-full h-20 w-15" src={track.track.album.images[0].url}
            />
             <div>
              <p>
                {track.track.name}
              </p>
              <p className="flex items-center justify-between ml-auto md:ml-0 text-yellow-400 space-x-5">
                {track.track.artists[0].name}
              </p>
              </div>
              <div className="flex items-center justify-between ml-auto md:ml-0"> 
                            <p className=" w-40 flex items-center justify-between p-8">   {track.track.album.name}</p>
                            <p className="p-8">{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
                            
              </div>
            </div>
            
</div>
  )
}

export default Song