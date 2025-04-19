import React from 'react'
import Spinner from '../../assets/img/Spinner.gif'
import '../../styles/loader.css'
const Loader = ()=>{
  
    return (
      <div className='text-center'>
        <img className='load' src={Spinner} alt="loading" />
      </div>
    )
  
}

export default Loader;
