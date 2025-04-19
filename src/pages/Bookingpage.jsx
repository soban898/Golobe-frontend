import React from 'react'
import Bookingdetails from '../components/Booking/Bookingdetails'
import Overview from '../components/Booking/Overview'
import AvailableRooms from '../components/Booking/AvailableRooms'
import LocationMap from '../components/Booking/LocationMap'
import ReviewSection from '../components/Booking/ReviewSection'

const Bookingpage = () => {
  return (
    <div>
      <Bookingdetails />
      <Overview/>
      <AvailableRooms/>
      <LocationMap/>
      <ReviewSection/>
    </div>
  )
}

export default Bookingpage
