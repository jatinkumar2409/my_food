"use client"
import React, { useEffect , useState } from 'react'
import Navbar from '@/components/Navbar'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ToastContainer , toast } from 'react-toastify'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase/fbinit'
const page = () => {
    
    const params =useSearchParams();
    const email = params.get('email');
   const [user, setuser] = useState(null)
  const [disabled, setdisabled] = useState(true)
  useEffect(() => {
    (async () => {
   const requestOptions = {
  method: "GET",
  redirect: "follow"
};
 try{
 const response = await fetch(`/api/user?email=${email}`, requestOptions)
  var data = await response.json();
  setuser(data);
  
 }
 catch(e){
    console.log(e.message);
 }

    })()
  }, [])
  const handleSave = async () => {
 const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const raw = JSON.stringify(user);
   const requestOptions = {
     method: "POST",
     headers: myHeaders,
     body: raw,
     redirect: "follow"
   };
   if(user.name.trim() !== "" && user.profile.trim() !== "" && user.phone.trim() !== "" && user.address.trim() !== "" && user.email.trim() !== "" && user.password.trim() !== ""){
    try{
    var response = await fetch("/api/update", requestOptions)
     var data = await response.json();
      console.log(data);
      setuser(data);
      if(data){
       toast("Data saved");
       router.push('/');
   
      }
    }
     catch(error) { console.error(error)
        }
    }
    else{
        toast("Invalid details");
    }
  }
  
  return (
    <div>
      <Navbar/>
      {user && 
      <div className='flex flex-col items-center'>
        <div className='w-[10vw] h-[10vw] rounded-full overflow-hidden relative'>
            <Image src={user.profile} fill alt='profile' className='object-center'/>
        </div>
      <div>
            <div className='text-orange-400'>Name</div>
            <input type="text" value={user.name} placeholder='Abc Jkl' className='border rounded w-[50vw] p-2' onChange={(e) => {setuser({ ...user , name : e.target.value} )
        setdisabled(false)}} />
        </div>
         <div className=''>
            <div className='text-orange-400'>Profile Picture Url</div>
            <input type="text" value={user.profile} placeholder='https://abc.svg' className='border rounded w-[50vw] p-2' onChange={(e) => {setuser({ ...user , profile : e.target.value} )
        setdisabled(false)}} />
        </div>
        <div>
            <div className='text-orange-400'>Email</div>
            <input type="text" value={user.email} placeholder='abc@gmail.com' className='border rounded w-[50vw] p-2' onChange={(e) => {setuser({ ...user , email : e.target.value} )
        setdisabled(false)}}  />
        </div>
        <div>
            <div className='text-orange-400'>Password</div>
            <input type="password" value={user.password}  placeholder='••••••••••••' className='border rounded w-[50vw] p-2' onChange={(e) => {setuser({ ...user , password : e.target.value} )
        setdisabled(false)}}/>
        </div>
        <div>
            <div className='text-orange-400'>Phone</div>
            <div className='flex gap-x-1 border rounded w-[50vw] p-2'>
              +91
            <input type="text" value={user.phone} placeholder='9876543210' className='outline-none' onChange={(e) => {setuser({ ...user , phone : e.target.value} )
        setdisabled(false)}} />
            </div>
        </div>
        <div className=''>
            <div className='text-orange-400'>Address</div>
            <input type="text" value={user.address} placeholder='abc@gmail.com' className='border rounded w-[50vw] p-2'  onChange={(e) => {
                setuser({ ...user , address : e.target.value} )
                setdisabled(false)
            }} />
        </div>
         <div className='flex justify-center gap-3 items-center my-4'>
          <button disabled={disabled} className={`py-1 px-3 text-white rounded ${disabled ? " bg-gray-600 " :"bg-black"}`} onClick={() => {handleSave()}}>
            Save
          </button>
          <div>
          <Link href={'/'} onClick={() => {signOut(auth)}} className='text-orange-400'>
            SignOut
          </Link>
          </div>
        </div>
      </div>
}
<Footer/>
<ToastContainer/>
    </div>
  )
}

export default page
