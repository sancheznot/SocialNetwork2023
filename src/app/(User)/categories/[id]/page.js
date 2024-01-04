'use client'
import CategoriesById from '@/components/Dashboard/Main/Categories/CategoriesById'
import React from 'react'

const page = ({params}) => {

    const {id} = params
  return (
    <div>
        <CategoriesById id={id}/>
    </div>
  )
}

export default page