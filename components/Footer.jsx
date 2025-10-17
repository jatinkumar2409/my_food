import React from 'react'
import Image from 'next/image'
import logo from '../assets/logo.svg'
const Footer = () => {
  return (
    <div className='bg-orange-400 py-[5vh] max-sm:py-[2vh] max-md:py-[3vh] text-white mt-[15vh]'>
       <div className='flex justify-around items-center'>
         <div className='flex items-center'>
                <Image src={logo} width={52} height={52} alt='AppLogo' className='max-sm:w-6 '/>
                <div className='p-1 font-semibold text-xl max-sm:text-sm' >MyFood</div>
              </div>
              <div>
                <ul className='flex max-sm:flex-col max-sm:text-[8px] max-md:text-[12px] gap-3 max-sm:gap-1 max-md:gap-2 text-sm'>
                    <li>
                        About us
                    </li>
                    <li>
                        Delivery
                    </li>
                    <li>
                        Help & Support
                    </li>
                    <li>
                        T&C
                    </li>
                </ul>
              </div>
              <div className='flex text-sm max-sm:text-[8px] max-md:text-[12px]'>
                Contact : <div className='font-bold'> +91 1234567890</div>
              </div>
       </div>
    </div>
  )
}

export default Footer
