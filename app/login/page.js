"use client"
import Navbar from '@/components/Navbar'
import React from 'react'
import foodlogin from '@/assets/foodlogin.jpg'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/fbinit'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ToastContainer , toast } from 'react-toastify'
const page = () => {
  const router = useRouter();
  const [data, setdata] = useState({email : "" , password : ""})
  const handleLogin = async() => {
     if(data.email.trim() !== "" && data.password.trim() !== ""){
     var userCredentials = await signInWithEmailAndPassword(auth , data.email , data.password);
     if (userCredentials.user){
      toast("Logged in Successfully")
        router.push("/")
     }
     }
  }
  return (
    <div>
      <Navbar/>
       <div className='flex  mx-[4vw] justify-center max-md:flex-wrap'>
        <div>
          <Image src={foodlogin} alt='foodLogin' className='rounded-2xl h-[80vh]'/>
        </div>
        <div className='flex flex-col gap-[2vh] mx-[5vw]'>
           <div className='text-2xl font-bold my-8 text-orange-400'>
           LogIn
        </div>
        <div className=''>
            <div className='text-orange-400'>Email</div>
            <input type="text" value={data.email} onChange={(e) => {setdata({...data , email : e.target.value})}} placeholder='abc@gmail.com' className='border rounded w-[50vw] max-sm:w-[80vw] p-2' />
        </div>
        
        <div>
            <div className='text-orange-400'>Password</div>
            <input type="password" value={data.password} onChange={(e) => {setdata({...data , password : e.target.value})}} placeholder='••••••••' className='border rounded w-[50vw] max-sm:w-[80vw] p-2'  />
        </div>
        <div className='flex justify-center items-center gap-3'>
        <button className='text-white bg-black py-1 px-3 rounded' onClick={handleLogin}>
          LogIn
        </button>
         <Link href={'/signin'} className='text-orange-400'>
         Create Account
         </Link>
        </div>
        </div>
       </div>
       <Footer/>
       <ToastContainer/>
    </div>
  )
}

export default page
