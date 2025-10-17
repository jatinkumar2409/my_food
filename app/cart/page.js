"use client"
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Delete from "@/assets/delete.svg"
import { auth } from '@/firebase/fbinit'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'
import { toast , ToastContainer } from 'react-toastify'
import logo from "@/assets/logo.svg"
const page = () => {
  const router = useRouter();
  const url = "http://localhost:3000"
    const [carts, setcarts] = useState([]);
    const [sum , setsum] = useState(0);
    const [user, setuser] = useState(null)
    const [payment, setpayment] = useState(false)
   useEffect(() => {
 (async () => {
     onAuthStateChanged( auth , async(authUser) => {
        if(authUser && carts.length === 0){
          var response = await fetch(`${url}/api/cart?email=${authUser.email}`);
     const data = await response.json();
     setcarts(data);
     console.log(data);
     var quantities = data.map((data1) => data1.quantity);
      var price = data.map((data1 , i) => {
           return data1.unitPrice * quantities[i]
      })
     setsum(price.reduce((sum , item) => sum + item , 0))
     console.log(data);
        }
     })
     
 })()
   
   }, [])
   useEffect(() => {
   ( async () => {
     onAuthStateChanged( auth , async(_user) => {
       if(_user && !user){
    var response = await fetch(`${url}/api/user?email=${_user.email}`)
     var data = await response.json();
     setuser(data);
     console.log(data)
       }
     })
      

   })()
   
   
   }, [])
   async function launchPayment(amount){
     const raw = JSON.stringify({amount : amount});
      const response = await fetch("https://backend-razorpay-one.vercel.app/create_order", {
    method: "POST",                 // HTTP method
    headers: { "Content-Type": "application/json" }, // tell server JSON is sent
    body: raw,      // convert JS object to JSON string
  });
  var data = await response.json();
    const options = {
         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
         name : "MyFood",
         image : {logo},
  order_id: data.orderId,
  amount: data.amount,
  currency: data.currency,
  handler: async function(response) { 
      const res = await fetch("https://backend-razorpay-one.vercel.app/verify_payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      orderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
    }),
  });
  const data = await res.json();
  if(data.success){
    console.log(data);
     var a = await addOrder({productIds : carts.map((data) =>  data.productId) , quantities : carts.map((data) => data.quantity),
      names : carts.map((data) => data.name) , unitPrices : carts.map((data) => data.unitPrice) , totalPrice : sum , email : user.email 
     })
     if(a){
    toast("Payment successfull");
    setpayment(true);
    
    carts.map((data) => {
      removeCart(data.productId)
    })
    router.push("/orders")
     }

  }
  else{
    alert("Payment failed")
  }
   }

    }
    const rzp = new window.Razorpay(options);
    rzp.open();
   }
   const addOrder = async (raw) => {
    var body = JSON.stringify(raw);
     var response = await fetch("http://localhost:3000/api/orders" , {method : "POST" , headers : {"Content-Type" : "application/json"} , 
    body : body})
    var data = await response.json();
    if(response.status == 200){
      return true;
    }
    else {
      return false;
    }
   }


  async function removeCart(productId){
     var response = await fetch(`http://localhost:3000/api/cart?id=${productId}&email=${user.email}` , {method : "DELETE"})
     var data = await response.json();
     console.log(data);
     if(data.status = 200){
    var newCart = carts.filter((data) => {
       return data.productId != productId
      })
      var quantities = newCart.map((data) => data.quantity)
      var prices = newCart.map((data , i) => {
        return data.unitPrice * quantities[i]
      })
      setcarts(newCart)
     setsum(prices.reduce((sum , item) => sum + item , 0))
    }
   }
    
  return (
    <div>
      <Navbar/>
      <div className='mx-[10vw] min-h-[80vh]'>
        <div className='text-3xl '>
            Cart
        </div>
        <div className='flex max-lg:flex-wrap'>
            <div>
              { carts.length !== 0 ?
                carts.map((data , i) => {

                   return <div key={i} className='flex my-4 bg-gray-100 rounded-4xl min-w-[40vw] justify-between'>
                    
                    <div className='flex gap-4'>
                    <div className='w-[10vw] h-[10vw] relative rounded-2xl overflow-hidden '><Image src={data.image} fill alt='cartfood' /> </div>
                        <div className='flex flex-col justify-center'>
                            <div className='text-xl max-sm:text-sm max-lg:text-lg'>{data.name}</div>
                            <div className='text-sm text-orange-400'>{data.cuisine}</div>
                            <div className='text-xl max-sm:text-sm max-lg:text-lg'>{data.quantity} Unit(s) </div>
                             <div className='text-xl max-sm:text-sm max-lg:text-lg'>₹{data.unitPrice * data.quantity}</div>
                        </div>
                        </div>
                        <div>
                            <Image src={Delete} alt='delete' width={24} height={24} className='my-4 mx-4' onClick={() => { removeCart(data.productId)}}/>
                        </div>
                
                   </div>
                }) : <div className='min-w-[40vw] justify-center items-center'> No food in cart</div>
              }
            </div>
            <div className='min-w-[10vw]'>
            </div>
            <div className='min-w-[30vw] flex flex-col gap-[10vw]'>
                <div>
                  <div className='text-2xl max-sm:text-sm max-lg:text-lg'>Personal Details</div>
                 {user && <div className='my-1'>Phone : {user.phone}</div>}
                 {user && <div className='my-1'>Address :{user.address} </div>}
                </div>
                { carts.length !== 0 &&
                <div>
                <div className='text-2xl my-4 max-sm:text-sm max-lg:text-lg'>Checkout</div>
                <div className='flex flex-col gap-2'>
                    { carts.map((data ,i) =>{
                       return <div key={i} className='flex justify-between max-sm:text-sm'>
                        
                            <div>{data.name}</div>
                            <div>₹{data.unitPrice * data.quantity}</div>
                       
                       </div>
                    })

                    }
                    <div className='flex justify-end'>
                    { !payment ? 
 <button onClick={() => {launchPayment(sum)}} className='py-1 px-3 bg-black text-white rounded'>Pay ₹{sum}</button> :
               <div> Payment verified</div>
                    }
                       
                    </div>
                </div>
                </div>
}
            </div>
        </div>
      </div>
      
      <Footer/>
    
      <ToastContainer/>
    </div>
  )
}

export default page
