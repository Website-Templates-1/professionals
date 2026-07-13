import Hero from "../components/hero-section/Hero";
import AboutUs from "../components/about-us-section/AboutUs";
import OurServices from "../components/our-service-section/OurServices";
import ContactUs from "../components/contact-us-section/ContactUs";
import Seo from "../components/seo/Seo";
import { site } from "../config/siteConfig";

const Home = () => {
  return (
    <>
      <Seo
        title={`Custom Software & Website Development | ${site.brand}`}
        description="Mintek Software builds custom websites, business applications and software solutions that automate operations and support business growth. Request a consultation."
        path="/"
      />
      <Hero />
      <AboutUs />
      <OurServices />
      <ContactUs />
    </>
  );
};

export default Home;
