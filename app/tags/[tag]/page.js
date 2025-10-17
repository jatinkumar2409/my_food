"use client"
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import { TagsPage } from '@/components/Misc/Misc'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer'
const page = () => {
    const [foodData, setfoodData] = useState([])
    const {tag} = useParams();
    useEffect(() => {
      ( async() => {
            const res = await fetch(`https://dummyjson.com/recipes/tag/${tag}`)
            const data = await res.json();
            console.log(data)
            setfoodData(data.recipes)
      })()
    
    }, [])
    
  return (
    <div>
      <Navbar/>
      <div className='mx-[10vw] font-bold'>
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </div>
      <div className='min-h-[80vh]'>
      <TagsPage foodData={foodData}/>
      </div>
      <Footer/>
    </div>
  )
}

export default page
