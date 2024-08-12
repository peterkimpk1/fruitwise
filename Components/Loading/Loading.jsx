import React from 'react'
import './Loading.css'
const Loading = () => {
  return (
    <div className='loading-wrapper'>
        <img className='heartbeat' src={'/assets/loadingstrawberry.jpg'}/>
        <p className='loading-msg'>Loading</p> 
    </div>
  )
}

export default Loading
