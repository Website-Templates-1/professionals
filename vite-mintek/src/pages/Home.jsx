import React from 'react'
import Hero from '../components/hero-section/Hero'
import AboutUs from '../components/about-us-section/AboutUs'
import OurServices from '../components/our-service-section/OurServices'
import ContactUs from '../components/contact-us-section/ContactUs'

const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurServices />
      <ContactUs />
    </>
  );
}

export default Home