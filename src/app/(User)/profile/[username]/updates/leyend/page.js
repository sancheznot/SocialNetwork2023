'use client'
import LeyendUpdate from '@/components/Dashboard/Profile/Updates/LeyendUpdate'
import React from 'react'

const page = ({params}) => {
  const {username} = params
  return (
    <LeyendUpdate username={username} />
  )
}

export default page