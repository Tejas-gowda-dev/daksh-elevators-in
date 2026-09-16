

import AutoPopupForm from "../components/AutoPopupForm";
import AboutPreview from "../components/Home/AboutPreview";
import CTASection from "../components/Home/CTASection";
import FAQSection from "../components/Home/FAQSection";
import HeroSection from "../components/Home/HeroSection";
import IndustriesSection from "../components/Home/IndustriesSection";
import ProductsSection from "../components/Home/ProductsSection";
import ServicesSection from "../components/Home/ServicesSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AutoPopupForm />
      <ProductsSection />
      <ServicesSection />
      <WhyChooseUs />
      <IndustriesSection />
      <TestimonialsSection />
      <AboutPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
