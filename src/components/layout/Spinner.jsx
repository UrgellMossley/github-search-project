import React from 'react';
import spinner from './assets/SpinnerAsset.gif'

function Spinner() {
  return <div className='w-100 mt-20'>
    <img src={spinner}
         alt="spinner icon" 
         className='text-center mx-auto' />
  </div>;
}

export default Spinner;
