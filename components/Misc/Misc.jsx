"use client"
import Image from "next/image";
import biryani from "@/assets/homepage/biryani.jpg"
import chicken from "@/assets/homepage/chicken.jpg"
import indianfood from "@/assets/homepage/indianfood.jpg"
import pizza from "@/assets/homepage/pizza.jpg"
import cookies from "@/assets/homepage/cookies.png"
import smoothie from "@/assets/homepage/smoothie.jpg"
import { useRouter } from "next/navigation";
import shopping from "@/assets/shopping.svg"
import prepTime from "@/assets/prepTime.svg"
export const HalfHeartShape = () => {
  const shapeStyle = {
    backgroundColor: '#ffb380', 
    borderTopRightRadius: '150px', 
    borderBottomRightRadius : '150px' ,
    transform : 'rotate(-45deg)',
    transformOrigin : 'left bottom'

  };
  return <div style={shapeStyle} className=" w-[250px] h-[150px] max-sm:h-[120px] max-sm:w-[210px]" />;
};

export const SecondHalfHome = () => {
  const router = useRouter();
  const imageArray = [biryani , smoothie , cookies , chicken , indianfood , pizza]
  const txtArray = ["Biryani" , "Smoothie" , "Cookies" , "Chicken", "Indian" , "Pizza"]
  return <>
    <div className="mx-[10vw]">
      <div className=" text-xl px-6 max-sm:text-sm">
        What's on your mind?
      </div>
       <div className="flex justify-around py-6">
        { 
          imageArray.map((src,i) =>{
            return <div key={i} className="overflow-x-hidden flex flex-col items-center gap-2 cursor-pointer" onClick={() => router.push(`/tags/${txtArray[i]}`)}>
              <div  className="h-[120px] w-[120px] max-sm:w-[30px] max-sm:h-[30px] max-lg:h-[60px] max-lg:w-[60px] overflow-hidden relative">
            <Image src={src} alt="foodimage" fill className="rounded-full object-center"/>
            </div>
            <div className="max-sm:text-[9px]">{txtArray[i]}</div>
            </div>
          })
        }
       </div>
    </div>
    <div className="m-4 mt-16">
      <div className="mx-[10vw] my-8 text-xl max-sm:text-sm">
        Personailzed recommendations
      </div>
       <ul className="flex justify-around mx-[5vw] max-sm:text-[6px]">
        <li className="flex flex-col bg-amber-100 justify-center items-center p-3 rounded-xl cursor-pointer" onClick={() => {router.push(`/fooddet?id=${3}`)}}>
          <div>
            <Image src={'https://cdn.dummyjson.com/recipe-images/3.webp'} width={160} height={160} alt="foodImage"/>
          </div>
          <div>
            Chocolate Chip Cookies
          </div>
          <div className="flex">
            <div>
             <Image src={shopping} alt="shopping" className="max-sm:w-[12px]" />
            </div>
            <div>₹150</div>
            
             
          </div>
        </li>
        <li className="flex flex-col bg-amber-100 justify-center items-center p-3 rounded-xl cursor-pointer" onClick={() => {router.push(`/fooddet?id=${1}`)}}>
          <div>
            <Image src={'https://cdn.dummyjson.com/recipe-images/1.webp'} width={160} height={160} alt="foodImage"/>
          </div>
          <div>
            Classic Margherita Pizza
          </div>
          <div className="flex">
            <div>
             <Image src={shopping} alt="shopping" className="max-sm:w-[12px]" />
            </div>
            
             <div>₹250</div>
             
             
          </div>
        </li>
        <li className="flex flex-col bg-amber-100 justify-center items-center p-3 rounded-xl cursor-pointer" onClick={() => {router.push(`/fooddet?id=${16}`)}}>
          <div>
            <Image src={'https://cdn.dummyjson.com/recipe-images/16.webp'} width={160} height={160} alt="foodImage"/>
          </div>
          <div>
            Japanese Ramen Soup
          </div>
          <div className="flex">
            <div>
             <Image src={shopping} alt="shopping" className="max-sm:w-[12px]" />
            </div>
             <div>₹180</div>
           
            
            
          </div>
        </li>
        <li className="flex flex-col bg-amber-100 justify-center items-center p-3 rounded-xl cursor-pointer" onClick={() => {router.push(`/fooddet?id=${11}`)}}>
          <div>
            <Image src={'https://cdn.dummyjson.com/recipe-images/11.webp'} width={160} height={160} alt="foodImage"/>
          </div>
          <div>
            Chicken Biryani
          </div>
          <div className="flex">
            <div>
             <Image src={shopping} alt="shopping" className="max-sm:w-[12px]" />
            </div>
              <div>₹500</div>
             
             
          </div>
        </li>
       </ul>
    </div>
  </>
}

export const TagsPage = ({foodData}) => {
  const router = useRouter();
     return <div>
 <div className='grid grid-cols-3 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-6 mx-[10vw] my-[5vh] '>
        { 
        foodData.length !== 0 ?
            foodData.map((a ,i) => {
              console.log(a)
             return<div key={i} className='flex bg-gray-100 p-4 gap-4 rounded-2xl pb-8 cursor-pointer'  onClick={()=>{router.push(`/fooddet?id=${a.id}`)}}>
               <div>
               <Image src={a.image} width={120} height={120} alt='foodImage' className='rounded-xl'/>
               </div>
               <div className='flex flex-col gap-2 w-full'>
                <div>{a.name}</div>
                <div className='font-extralight text-[14px] text-gray-400'>{a.cuisine}</div>
                <div className='flex justify-between w-full h-full'>
                  <div className="flex">
                              <div>
                               <Image src={shopping} alt="shopping" className="" />
                              </div>
                               <div>₹{a.caloriesPerServing}</div>
                            </div>
                             <div className="flex">
                              <div>
                               <Image src={prepTime} alt="shopping" className="" />
                              </div>
                               <div>{a.prepTimeMinutes}mins</div>
                            </div>
                </div>
               </div>
             </div>
            }) : <div className='my-4'>No items</div>
        }
    </div>
 </div>



}