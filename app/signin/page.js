"use client"
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import foodlogin from '@/assets/foodlogin.jpg'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Link from 'next/link'
import {auth} from "@/firebase/fbinit.js"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut , updateProfile } from 'firebase/auth'
import { toast ,ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    name : "", 
    profile : "" ,
     email : "" ,
     password : "" ,
     phone : "" ,
     address : ""
  })
  const handleClick = async() => {
     if(user.name.trim() !== "" && user.profile.trim() !== "" && user.phone.trim() !== "" && user.address.trim() !== "" && user.email.trim() !== "" && user.password.trim() !== ""){
    try{
     const credential = await createUserWithEmailAndPassword(auth , user.email , user.password)
     if(credential.user){
      await updateProfile(credential.user, {
        displayName : user.name , photoURL : user.profile
      }) 
      await credential.user.reload();
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify(user);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
 try{
 var response = await fetch("/api/signin", requestOptions)
  var data =  await response.text()
   console.log(data);
    toast("Signed in");
    router.push('/')
 }
  catch(error) { console.error(error)
     }
    
   
  }
}
    catch(e){
      console.log(e.message);
    }
  }
  else{
    toast("Invalid details")
  }
  }
   
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center mx-[4vw] max-md:flex-wrap'>
        <div>
          <Image src={foodlogin} alt='foodLogin' className='rounded-2xl h-[80vh]'/>
        </div>
        <div className='mx-[5vw] flex flex-col gap-2'>
        <div className='text-2xl font-bold my-8 text-orange-400'>
            SignIn
        </div>
        <div>
            <div className='text-orange-400'>Name</div>
            <input type="text" value={user.name} placeholder='Abc Jkl' className='border rounded w-[50vw] max-sm:w-[80vw]  p-2' onChange={(e) => {setuser({ ...user , name : e.target.value} )}} />
        </div>
         <div className=''>
            <div className='text-orange-400'>Profile Picture Url</div>
            <input type="text" value={user.profile} placeholder='https://abc.svg' className='border rounded w-[50vw] max-sm:w-[80vw] p-2' onChange={(e) => {setuser({ ...user , profile : e.target.value} )}} />
        </div>
        <div>
            <div className='text-orange-400'>Email</div>
            <input type="text" value={user.email} placeholder='abc@gmail.com' className='border rounded w-[50vw] max-sm:w-[80vw] p-2' onChange={(e) => {setuser({ ...user , email : e.target.value} )}}  />
        </div>
        <div>
            <div className='text-orange-400'>Password</div>
            <input type="password" value={user.password}  placeholder='••••••••••••' className='border rounded w-[50vw] max-sm:w-[80vw] p-2' onChange={(e) => {setuser({ ...user , password : e.target.value} )}}/>
        </div>
        <div>
            <div className='text-orange-400'>Phone</div>
            <div className='flex gap-x-1 border rounded w-[50vw] max-sm:w-[80vw] p-2'>
              +91
            <input type="text" value={user.phone} placeholder='9876543210' className='outline-none' onChange={(e) => {setuser({ ...user , phone : e.target.value} )}} />
            </div>
        </div>
        <div>
            <div className='text-orange-400'>Address</div>
            <input type="text" value={user.address} placeholder='abc' className='border rounded w-[50vw] max-sm:w-[80vw] p-2' onChange={(e) => {setuser({ ...user , address : e.target.value} )}} />
        </div>
        <div className='flex justify-center gap-3 items-center'>
          <button className='bg-black text-white py-1 px-3 rounded' onClick={handleClick}>
            SignIn
          </button>
          <div>
          <Link href={'/login'} className='text-orange-400'>
            Login
          </Link>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default page
