import React from 'react'
import { useNavigate } from 'react-router-dom'

function Status() {
  const navigate = useNavigate();
  return (
    <div className='successPageContainer'>
      <button className='PaymentButton shopMore' onClick={() => navigate('/products/All')}>Shop More</button>
    </div>
  )
}

export default Status;
