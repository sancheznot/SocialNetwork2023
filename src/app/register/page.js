import React from 'react'
import Form from '../../components/Form'
import Image from 'next/image'
import gif from '../../../public/gif/giphy.gif'


const page = () => {

  return (
    <div className='flex flex-row w-full h-screen'>
      <div className='bg-white w-6/12 flex justify-center items-center'>
       < Image src={gif} width={512} height={512} alt='gif'/>
      </div>
      <Form />  
    </div>
  )
}

export default page