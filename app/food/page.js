"use client"
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect ,useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TagsPage } from '@/components/Misc/Misc'
const page = () => {
    const [foodData, setfoodData] = useState([])
    const params = useSearchParams();
    const food = params.get("food");
    useEffect(() => {
        async function loadData(){
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${food}`)
        const data = await response.json();
        setfoodData(data.recipes);
        console.log(data.recipes)
        }
        loadData()
}, [food])
    
  return (
    <div>
    <Navbar/>
    <div className='font-bold mx-[10vw]'>
      Search results for "{food}"
    </div>
    <div className='min-h-[80vh]'>
    <TagsPage  foodData={foodData}/>
    </div>
    <div className='w-full'><Footer/></div>
    
    </div>
  )
}

export default page