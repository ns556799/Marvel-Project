import React from 'react'
import '../css/Header.css'
const Header = () => {
  return (
    <header className='app-header'>
      <div>
        <div className='wrap'>
          <div className='app-header__text'>
            <span className='app-header__text-one'>Marvel</span>
            <span className='app-header__text-two'>Database</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
