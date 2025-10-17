"use client"
import Navbar from '@/components/Navbar'
import React from 'react'
import { useEffect , useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/fbinit'
import Footer from '@/components/Footer'
const page = () => {
 
  const [orders, setOrders] = useState([])
 useEffect(() => {
      onAuthStateChanged(auth , (authUser) => {
       if(authUser && orders.length === 0){
        ( async () => {
          try{
              var response = await fetch(`/api/orders?email=${authUser.email}`)
              var data = await response.json();
              if(data){
                 console.log(data);
                 setOrders(data);
              }
          console.log("dtaa" + data)
            }
            catch(e){
              console.log(e)
            }
        })()
       }
      })
 
    }, [])
 
  return (
    <div>
      <Navbar/>
      <div className='mx-[10vw] min-h-[72vh]'>
        <div className='text-2xl max-sm:text-sm max-lg:text-lg'>
          Orders 
        </div>
        { orders.length !== 0 ?
          orders.map((data , i) => {
            return <div key={i} className='w-[60vw] my-4 p-4 bg-gray-100 rounded-2xl'>
               {
                  data.names.map((e , j) => {
                    return <div key={j} className='flex justify-between items-center  text-xl max-sm:text-sm max-lg:text-lg'>
                      <div>
                        {e} - {data.quantities[j]} Unit(s)
                      </div>
                      <div>
                        ₹{data.unitPrices[j] * data.quantities[j]}
                      </div>
                    </div>
                  })
               }
               <div className='flex justify-end text-xl text-orange-400'>₹{data.totalPrice}</div>
            </div>
          }) : <div className='my-2'> No orders</div>
        }
      </div>
      <div className='w-full'>
         <Footer/>
      </div>
     
    </div>
  )
}

export default page
