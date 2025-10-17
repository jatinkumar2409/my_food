import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HalfHeartShape , SecondHalfHome } from "@/components/Misc/Misc";
import food from '../assets/food.png'
import Image from "next/image";
import banana from '../assets/banana.png'
import apple from '../assets/apple.png'
export default function Home() {
  return (
    <div className="overflow-x-hidden">
    <Navbar/> 
    
    <div className="flex items-center justify-around mx-[10vw]" style={{
      width : '100vw' ,
      position : 'relative',
      zIndex : '2'
    }}>
      <div className=" text-5xl max-sm:text-2xl">
        <div className="flex gap-3 py-2">
        <div>
          Premium  
        </div><div className="text-orange-400" >  quality
          </div> </div>
          <div className="flex py-2">
          <div>Food for your</div>
         <Image src={banana}  alt="banana" className="w-[6rem] h-[3.5rem] max-sm:w-[3rem] max-sm:h-[2rem]"/>
         <div className="text-orange-400">healthy</div></div>
         <div className="flex py-2">
        <Image src={apple} alt="apple" className="w-[6rem] h-[3.5rem] max-sm:w-[3rem] max-sm:h-[2rem]"/>
        <div className="text-orange-400"> & Daily life </div></div>
        <div  className="p-[2rem] text-[16px] max-md:text-[12px] max-sm:p-2 w-[60vw] max-md:w-[80vw]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium nesciunt rerum, quaerat voluptate libero fugit nemo molestiae sapiente quae, totam sed repellendus. Corrupti beatae similique totam sint, reprehenderit consequuntur aliquam expedita magni.
        </div>
        <div style={{
          fontSize : '16px'
        }}>
        <div className="flex gap-4 my-8 py-1">
      <input type="text" style={{
        width : '24vw' ,
      }} className="border outline-none rounded px-2 w-[24vw] max-md:w-[10vw]" placeholder="Enter your delivery location to check"/>
      <button className="px-4 py-2 max-sm:p-1 max-sm:text-sm bg-black text-white rounded">
        Get Started
      </button>
    </div>
    <div className="flex flex-col gap-2 max-sm:text-[12px] max-sm:gap-1">
      Popular Cities in India
      <div className="flex gap-2 max-sm:gap-1">
      <div className="text-orange-300">Hyderabad</div>
      <div className="text-gray-500">Delhi</div>
      <div className="text-orange-300">Chennai</div>
      <div className="text-gray-500">Mumbai</div>
      <div className="text-orange-300">Kolkata</div>
      <div className="text-gray-500">Bangalore</div>
      </div>
    </div></div>
      </div>
      
    <Image src={food} style={{
      width : '40vw' ,
    }} alt="food"/>
    </div>
  <div style={{
      position : 'absolute' ,
      top : '50vh'
    }}>
    <HalfHeartShape/>
    </div>
    <div>
    
    </div>

    {/* Second page */}
    <div className="h-24"></div>
    <SecondHalfHome/>
    <Footer/>
    </div>
  );
}
