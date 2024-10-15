import React from 'react'
import Image from 'next/image'
import logo from "../../../../../public/intranet.png"

const Header = () => {
  return (
    <div className={`bg-black h-20 w-full flex op-header`}><Image src={logo} alt='logo' /></div>
  )
}

export default Header