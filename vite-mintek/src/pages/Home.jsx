import Hero from "../components/hero-section/Hero";
import AboutUs from "../components/about-us-section/AboutUs";
import OurServices from "../components/our-service-section/OurServices";
import PortfolioSection from "../components/portfolio-section/PortfolioSection";
import ContactUs from "../components/contact-us-section/ContactUs";
import Seo from "../components/seo/Seo";
import { site } from "../config/siteConfig";

const Home = () => {
  return (
    <>
      <Seo
        title={`Custom Software, Automation & Website Development | ${site.brand}`}
        description="Mintek Software builds custom software, business automation and high-performing websites that streamline operations and support business growth. Request a consultation."
        path="/"
      />
      <Hero />
      <OurServices />
      <PortfolioSection />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Home;
