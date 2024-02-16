'use client'
import AvatarUpdate from '@/components/Dashboard/Profile/Updates/AvatarUpdate'
import React from 'react'

const page = ({params}) => {
    const {username} = params
  return (
    <AvatarUpdate username={username}/>
  )
}

export default page