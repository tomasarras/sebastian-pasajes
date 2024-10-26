import Image from 'next/image'
import React from 'react'
import logo from "../../../../public/logo.png"

const StaticHeader = ({ className }) => {
  return (
    <div className={`bg-white h-20 w-full flex ${className}`}><Image src={logo} alt='logo' /></div>
  )
}

export default StaticHeader