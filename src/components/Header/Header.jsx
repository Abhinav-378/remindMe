import React from 'react'
import logo from '../../assets/whiteLogo.png';
function Header() {
  return (
    <div className='fixed top-0 h-16 bg-[#333] bg-opacity-50 backdrop-blur-lg border border-none w-full flex justify-center items-center z-50'>
      <img src={logo} className='h-10' alt="logo" />
    </div>
  )
}

export default Header
