import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Benefits from "../components/sections/Benefits";
import Architect from "../components/sections/Architect";
import Programs from "../components/sections/Programs";
import Testimonials from "../components/sections/Testimonials";
import Library from "../components/sections/Library";
import { Nutrition, AgeGroups } from "../components/sections/InfoSections";
import { FinalCTA, Footer } from "../components/layout/Footer";
import DynamicBackground from "../components/ui/DynamicBackground";
import CoachDemo from "../components/sections/CoachDemo";
import FeedbackForm from "../components/ui/FeedbackForm";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <DynamicBackground />
      <Navbar />
      <Hero />
      <Benefits />
      <Architect />
      <CoachDemo />
      <Programs />
      <Testimonials />
      <Library />
      <Nutrition />
      <AgeGroups />
      <FinalCTA />
      <FeedbackForm />
      <Footer />
    </main>
  );
}


