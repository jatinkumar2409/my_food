"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useEffect , useState , Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import starrate from '@/assets/starrate.svg'
import Footer from '@/components/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/fbinit'
  import { ToastContainer, toast } from 'react-toastify';
const PageContent = () => {
  const [email, setemail] = useState(null)
    useEffect(() => {
      onAuthStateChanged(auth , (user) => {
        if(user && !email){
          setemail(user.email)
        }
      })
    
      
    }, [])
    
    const addToCart = async (cartProd) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify(cartProd);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
       try{
       var response = await fetch("/api/cart", requestOptions)
        var data =  await response.json()
         console.log(data);
         if(response.status === 200){
          toast("Added to cart");
         }
         else if(response.status === 404){
           toast(data.message)
         }
       }
        catch(error) { console.error(error)
           }
    }
    var params = useSearchParams();
    const dishId = params.get("id");
    const [dish, setdish] = useState(null);
    const [quant, setquant] = useState(1)
    // const [totalprice, settotalprice] = useState(0)
  useEffect(() => {
   ( async () => {
      var response = await fetch(`https://dummyjson.com/recipes/${dishId}`)
      var data = await response.json();
      console.log(data);
     setdish(data)
     console.log(data.image);
   })();

}, [])

  return (
    <div>
      <Navbar/>
      {dish &&
      <div className='mx-[10vw] flex flex-wrap gap-x-[4vw]'>
        <div>
             <Image src={dish.image} width={240} height={240} alt='dish' className='rounded-4xl'/>
        </div>
        <div className='flex flex-col  my-[4vh]'>
    <div className='text-2xl max-sm:text-sm'>{dish.name}</div>
    <div className='text-orange-300'>{dish.cuisine}</div> 
    <div className='flex gap-[5vw] my-4 text-xl'> 

    <div className='flex flex-col justify-center my-4 '>
    <div className='flex'> 
        <Image  src={starrate} alt='starrate'/>
        <div>{dish.rating}</div>
    </div>
    <div className='text-orange-400'>
        {dish.reviewCount} ratings
    </div>
    </div>
    <div className='flex flex-col justify-center'>
    <div className='flex'> 
        {dish.prepTimeMinutes} minutes
    </div>
    <div className='text-orange-400'>
       Delivery Time
    </div>
    </div>
    <div className='flex flex-col justify-center'>
    <div className='flex'> 
        ₹{dish.caloriesPerServing * quant}
    </div>
    <div className='text-orange-400'>
        Free Delivery
    </div>
    </div>
     <div className=''>
   
    </div>
    </div>
    <div>

    </div>
        </div>
        <div className='flex flex-col justify-center items-start gap-2'>
       <div className='flex gap-6 items-center text-xl'> 
        <div>Quantity</div> 
        <button className='text-3xl' onClick={() =>{quant>1 ? setquant(quant-1) : ''}}> - </button>
        <div>{quant}</div>
        <button className='text-3xl' onClick={() =>{setquant(quant+1)}} > + </button>
    </div>
    <button className='bg-black text-white py-1 px-4 rounded ' onClick={() => {addToCart({productId : dish.id , name : dish.name , cuisine : dish.cuisine , image : dish.image , quantity : quant , unitPrice : dish.caloriesPerServing , email : email })}}>
        Add
    </button>
    </div>
      </div>
      
}
  <div className='mx-[10vw] my-10'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, eaque magnam. Placeat eum id ducimus incidunt dicta porro sequi pariatur, exercitationem, est enim assumenda ipsam illo officiis nobis nihil corporis dolore provident. Facere, ea?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit minus eaque dolorum iste ipsum inventore ipsam ipsa quisquam cupiditate, temporibus repellendus non odio soluta doloremque ducimus harum rerum beatae rem hic. Quas, explicabo sit.
        </div>
        <Footer/>
        <ToastContainer theme='dark' />
    </div>
  )
}
 const page = () => {
  return <>
  <Suspense fallback={<div className='m-4'>Loading...</div>}>
    <PageContent/>
  </Suspense>
  </>
 }
export default page
