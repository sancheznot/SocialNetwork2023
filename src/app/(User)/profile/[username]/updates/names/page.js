'use client'
import NamesFormUpdate from '@/components/Dashboard/Profile/Updates/NamesFormUpdate'
import React from 'react'

const page = ({params}) => {
  const {username} = params
  return (
    <NamesFormUpdate username={username} />
  )
}

export default page