import React from 'react'
import{getProviders,signIn} from 'next-auth/react'

function login({providers}){
return (
<div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
<img className='w-52 mb-5' src='https://links.papareact.com/9xl'/>

{Object.values(providers).map((provider) => (
  <div key={provider.name}>
    <button className = 'bg-green-500 text-white p-5 rounded-full '
           onClick ={()=>signIn(provider.id,{callbackUrl: "/"})} >
             login with {provider.name}
    </button></div>
    ))}
    </div>
  );
}

export default login

export async function getServerSideProps (){
    const providers = await getProviders();
return{
    props:{
        providers,
    },
}
}