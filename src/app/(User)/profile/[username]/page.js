import Main from '@/components/Dashboard/Profile/Main'
import React from 'react'

const page = ({params}) => {

  const {username} = params

  return (
  <Main username={username} />
  )
}

export default page