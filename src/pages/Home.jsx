import React from 'react'
import Hero from '../components/home/hero/Hero'
import Catalog from '../components/home/catalog/Catalog'
import Advantage from '../components/home/advantages/Advantage'
import VideoSection from '../components/home/video/VideoSection'
import ReviewsSection from '../components/home/reviews/ReviewsSection'
import Terms from '../components/home/terms/Terms'
import Footer from '../components/common/footer/Footer'

const Home = () => {
  return (
    <div style={{overflow:"hidden"}}>
      <Hero />
      <Catalog />
      <Advantage />
      <VideoSection />
      <ReviewsSection />
      <Terms />
    </div>
  )
}

export default Home
