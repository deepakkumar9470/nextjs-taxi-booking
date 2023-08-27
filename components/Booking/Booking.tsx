import React from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import PaymentCards from './PaymentCards'

const Booking = () => {
  // const screenHeight = window.innerHeight*0.72;
  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-2">Booking</h2>
      <div className="p-5 shadow-md border-2 rounded-md">
      <AutoCompleteAddress/>
      <Cars/>
      <PaymentCards/>
      <button className="w-full rounded-md p-1 mt-4 bg-yellow-400">
        Book Now
      </button>
      </div>
    </div>
  )
}

export default Booking