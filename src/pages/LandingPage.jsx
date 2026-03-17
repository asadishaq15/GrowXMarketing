import React from "react";

import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import ServicesSection from "../Components/ServicesSection";
import HowItWorks from "../Components/HowItWorks";
import TestimonialsSection from "../Components/TestimonialsSection";
import HelpSection from "../Components/HelpSection";
import ContactForm from "../Components/ContactForm";
import Footer from "../Components/Footer";

const LandingPage = ({ setActiveModal }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      <HeroSection setActiveModal={setActiveModal} />
      <ServicesSection />
      <HowItWorks />
      <TestimonialsSection />
      <HelpSection />
      <ContactForm setActiveModal={setActiveModal} />
    </main>
    <Footer setActiveModal={setActiveModal} />
  </div>
);

export default LandingPage;