import React from 'react'
import Bookingdetails from '../components/Booking/Bookingdetails'
import Overview from '../components/Booking/Overview'
import LocationMap from '../components/Booking/LocationMap'
import ReviewSection from '../components/Booking/ReviewSection'

const Bookingpage = () => {
  return (
    <div className='b-c'>
      <Bookingdetails />
      <Overview/>
      
      <LocationMap/>
      <ReviewSection/>
    </div>
  )
}

export default Bookingpage
