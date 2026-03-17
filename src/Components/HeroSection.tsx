import React from 'react';
import { ModalType } from '../App';

interface HeroSectionProps {
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType>>;
}

const HeroSection: React.FC<HeroSectionProps> = () => (
  <div className="relative h-[45vh] overflow-hidden">
    {/* Background with green gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-500 opacity-95"></div>
    
    {/* Decorative shapes */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>

    <div className="relative h-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between h-full py-8">
        {/* Left content */}
        <div className="text-white md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Ready to Scale Your Business?
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-6">
            Expert digital marketing strategies designed to drive real results and sustainable growth for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition duration-300 text-center shadow-lg"
            >
              Get Started Today
            </a>
            <a 
              href="#services" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition duration-300 text-center"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right content - Stats */}
        <div className="md:w-1/2 flex justify-center">
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-green-100 text-sm">Clients Served</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-green-100 text-sm">Client Retention</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">3x</div>
              <div className="text-green-100 text-sm">Avg. ROI</div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-green-100 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;