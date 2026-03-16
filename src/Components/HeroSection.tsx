import React from 'react';
import { ModalType } from '../App';

interface HeroSectionProps {
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setActiveModal }) => (
  <section className="py-12 md:py-20 bg-gradient-to-br from-green-50 to-green-100">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Grow Your Business with <span className="text-green-600">Expert</span> Marketing
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We help businesses achieve sustainable growth through data-driven marketing strategies, 
            innovative campaigns, and cutting-edge digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-300 text-center"
            >Get Started</a>
     
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <img 
            src="/images/marketing_growth.jpg" 
            alt="Marketing Growth Graph"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;