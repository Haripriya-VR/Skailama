import React from 'react'
import Logo from '../logo/Logo'
import Icons from '../icons/Icons'

function Topbar() {
  return (
    <div className='flex justify-between '>
      <div><Logo/></div>
      <div className='flex'>
      <Icons/>
      </div>
    </div>
  )
}

export default Topbar
