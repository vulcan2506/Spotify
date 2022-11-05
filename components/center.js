import { useSession } from 'next-auth/react'
import{ChevronDownIcon} from'@heroicons/react/solid'
import { useEffect , useState } from 'react'
import { shuffle } from 'lodash'
import useSpotify from '../hooks/useSpotify'
import { playlistIdState, playlistState } from '../atoms/playlistAtoms'
import { useRecoilValue ,useRecoilState} from 'recoil'
import Songs1 from './Songs1'
const colors=[
  'from-indigo-600',
  'from-red-600',
  'from-green-600',
  'from-blue-600',
  'from-orange-600',
  'from-yellow-600',
  'from-purple-600',
  'from-pink-600'
];
function center()
{
    const{data: session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const[playlist, setPlaylist] = useRecoilState(playlistState);
    
    useEffect(() => {
    setColor(shuffle(colors).pop()); 
    }, [playlistId]) 

    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data) => {
          setPlaylist(data.body)
        },
        ).catch((err)=>console.log(err))
    },[spotifyApi, playlistId]);
  
   
    console.log(playlist);
    
    
    return (
    <div className ='flex-grow text-white h-screen overflow-y-auto scrollbar-hide'>
      <header className='absolute top-5 right-8'>
    <div className='flex items-center bg-gray-900 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
        <img className='rounded-full w-10 h-10' src={session?.user?.image}/>
        <h2>{session?.user.name}</h2>
        <ChevronDownIcon className='h-5 w-5'/>
    </div>
    </header>
    
    <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
    <img className='h-44 w-44 shadow-3xl'
      src={playlist?.images?.[0]?.url} 
      alt =" "
      />
    <div>
      <p className=' text-2xl md:text-3xl xl:text-5xl bold'>PLAYLIST</p>
      <h1 className=' text-4xl md:text-6xl xl:text-8xl bold'>
        {playlist?.name}
      </h1>
    </div>
   
    </section>
    <div>
    <Songs1/>

    </div>
    </div>
  ); 
}


export default center;



    
   
