import { getSession } from "next-auth/react"
import Sidebar from "../components/sidebar"
import Center from "../components/center"
import Player from "../components/player"
export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar/>
         <Center/>
        </main>
<div className="sticky bottom-0 text-white">

  <Player/>
</div>
</div>
  )
}

export async function getServerSideProps(context)
{
      const session = await getSession(context);
      return {
        props: {
          session,
        },
      }
}
  
