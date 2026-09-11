import Hero from "../components/hero-section/Hero";
import AboutUs from "../components/about-us-section/AboutUs";
import OurServices from "../components/our-service-section/OurServices";
import LocalServices from "../components/local-services-section/LocalServices";
import PortfolioSection from "../components/portfolio-section/PortfolioSection";
import ContactUs from "../components/contact-us-section/ContactUs";
import ResearchTeaser from "../components/home/ResearchTeaser";
import Seo from "../components/seo/Seo";
import Faq from "../components/common/Faq";
import Testimonials from "../components/common/Testimonials";
import { site, homeFaqs } from "../config/siteConfig";

const Home = () => {
  return (
    <>
      <Seo
        title={`Custom Software & Business Automation | ${site.brand}`}
        description="Mintek Software builds custom business software, web applications and automated workflows for companies across Brampton and the GTA. Website projects start at $1,500."
        path="/"
      />
      <Hero />
      <ResearchTeaser />
      <OurServices />
      <LocalServices />
      <PortfolioSection />
      <Testimonials limit={3} />
      <AboutUs />
      <Faq
        items={homeFaqs}
        subtitle="Answers to common questions about how we work with businesses across the Greater Toronto Area."
      />
      <ContactUs />
    </>
  );
};

export default Home;
