'use client'
import UsernameUpdate from '@/components/Dashboard/Profile/Updates/UsernameUpdate'
import React from 'react'

const page = ({params}) => {
  const {username} = params
  return (
    <UsernameUpdate username={username}/>
  )
}

export default page