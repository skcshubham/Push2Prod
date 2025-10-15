import AppNavigation from "../components/AppNavigation";
import { Box } from "@chakra-ui/react";
import CTASection from "../components/CTASection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import PricingSection from "../components/PricingSection";
import TechStackSection from "../components/TechStackSection";

export default function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box>
      <AppNavigation scrollToSection={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TechStackSection />
      <CTASection />
      <Footer />
    </Box>
  );
}
