import React from 'react'
import '../css/Cookiebar.css'

const Cookiebar = (props) => {
  return (
    <div className='app-cookie'>
      <div className='wrap'>
        <div className='app-cookie__content'>
          <span>True believers! Cookie message</span>
          <button onClick={props.accept}> Ok</button>
        </div>
      </div>
    </div>
  )
}

export default Cookiebar
