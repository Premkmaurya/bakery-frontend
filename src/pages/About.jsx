import React from 'react'
import AboutHero from '../components/about/top/AboutHero'
import PromiseSection from '../components/about/middle/PromiseSection'
import CtaSection from '../components/about/bottom/CtaSection'

const About = () => {
  return (
    <div>
        <AboutHero />
        <PromiseSection />
        <CtaSection />
    </div>
  )
}

export default About