import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import StorySection from "./components/StorySection";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <StorySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default App;
