import React from 'react'
import Form from '@/components/Form'
import Image from 'next/image'
import logo from "@pb/img/nobgLogo.png"

const page = () => {

  return (
    <div className='flex flex-row sm:flex-col w-full sm:items-center'>
      <div className='light:bg-white w-6/12 sm:hidden flex justify-center items-center'>
        <Image src={logo} alt={logo} width={500} height={500} />
      </div>
      <Form />  
    </div>
  )
}

export default page