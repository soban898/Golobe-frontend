import React from 'react'
import HeroSection from '../components/Landing/HeroSection'
import Searchbox from '../components/Landing/Searchbox'
import Recent from '../components/Landing/Recent'
import City from '../components/Landing/City'
import TravelCardGrid from '../components/Landing/CardGrid'
const Landing = () => {
  return (
    <div>
      <HeroSection/>
      <Searchbox/>
      <Recent/>
      <City/>
      <TravelCardGrid/>
    </div>
  )
}

export default Landing
