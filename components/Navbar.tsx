import React from 'react'
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
   
      <div className='text-black py-5 shadow-sm border-b-2 flex justify-between items-center px-10'>
        <div>
        <Image src='/logo.png'
            alt='logo'
            width={120}
            height={60}
            />
        </div>

        <div className='flex items-center gap-5'>
          <h3>Home</h3>
          <h3>History</h3>
          <h3>Help</h3>        
          <UserButton afterSignOutUrl="/"/>
        </div>
    </div>

   
  )
}

export default Navbar