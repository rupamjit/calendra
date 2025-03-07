import Footer from "@/components/landingPage/Footer";
import HeroSection from "@/components/landingPage/HeroSection";
import HowItWorks from "@/components/landingPage/HowItWorks";
import TestimonialsCarousel from "@/components/landingPage/TestimonialsCarousel";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      {/* How It Works */}
      <HowItWorks />
      {/* Testimonials */}
      <TestimonialsCarousel/>
      {/* Footer */}
      <Footer />
    </div>
  );
}
