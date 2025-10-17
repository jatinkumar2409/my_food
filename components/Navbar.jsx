"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../assets/logo.svg'
import search from '../assets/search.svg'
import shoppingbag from '../assets/shoppingbag.svg'
import orders from '../assets/orders.svg'
import { useState } from 'react'
import {auth} from "@/firebase/fbinit.js"
import Link from 'next/link'
import { onAuthStateChanged } from 'firebase/auth'
const Navbar = () => {
  console.log(auth.currentUser + "nav")
  const [food, setfood] = useState("")
  const [authUser , setAuthUser] = useState(null);
  const [img , setimg] = useState(null);
  useEffect(() => {
    const authState = onAuthStateChanged(auth , (fbUser) => {
      if(fbUser){
       setAuthUser(fbUser); 
       setimg(fbUser.photoURL);
      }
    })
      
    return () => {
      authState()
    }
  }, [])
  
  return (
    <div className='flex justify-around items-center py-12'>
      <div className='flex items-center'>
        <Image src={logo} width={52} height={52} alt='AppLogo' className='max-sm:w-6'/>
        <div className='p-1 font-semibold text-xl max-sm:text-sm' >MyFood</div>
      </div>
      <div className='flex gap-6 max-sm:gap-2 max-md:3 items-center'>
        <div className='flex border rounded-lg p-1'>
        <input type="text" value={food} placeholder='Search dish' 
         className='outline-none relative md:w-[20vw] max-sm:w-[10vw] max-sm:text-sm border-black ' style={{
          width : '24vw',
         }}
         onChange={(e) => {setfood(e.target.value)}}
         />
         <Link href={`/food?food=${food}`} className='flex items-center'>  <Image src={search} width={16} height={4} alt='search_icon' />
         </Link>
        
         
        </div>
        <Link href={'/cart'}>
          <Image src={shoppingbag} alt='shoppingBag' className='max-sm:w-4 max-sm:h-4'/>
          </Link>
          <Link href={'/orders'}>
          <Image src={orders} alt='orders' className='max-sm:w-4 max-sm:h-4'/>
          </Link>
          { img ? <div className='w-[3vw] h-[3vw] rounded-full relative overflow-hidden'>
            <Link href={`/user?email=${authUser.email}`}>
            <Image src={img} alt='profile' fill className='object-cover' /></Link>
            {/* Signed in */}
            </div>  : <Link href={'/signin'}>
          <button className = 'bg-black text-white px-3 py-1 max-sm:text-sm rounded max-sm:p-1'>
           SignIn
          </button>
          </Link>
          }
         
      </div>
    </div>
  )
}

export default Navbar
