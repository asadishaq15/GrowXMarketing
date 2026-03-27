import React from 'react';

const HeroSection: React.FC = () => (
  <div className="relative min-h-[600px] md:h-[70vh] flex items-center overflow-hidden py-16 md:py-0">
    {/* Background with brand gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#034365] via-[#467C9E] to-[#72B9CA] opacity-95"></div>
    
    {/* Decorative softened glows */}
    <div className="absolute -top-32 -right-32 w-48 md:w-[600px] h-48 md:h-[600px] bg-white opacity-[0.03] md:opacity-[0.07] rounded-full blur-3xl"></div>
    <div className="absolute -bottom-48 -left-24 w-64 md:w-96 h-64 md:h-96 bg-[#72B9CA] opacity-[0.05] md:opacity-[0.08] rounded-full blur-3xl"></div>

    <div className="relative w-full max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left content */}
        <div className="text-white md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1]">
            Get the Coverage You Deserve
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl mx-auto md:mx-0">
            Expert health insurance solutions designed to protect you and your family. Affordable plans tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-white text-[#034365] font-bold rounded-full hover:bg-blue-50 transition duration-300 text-center shadow-xl hover:shadow-2xl flex items-center justify-center"
            >
              Get Started Today
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition duration-300 text-center backdrop-blur-sm"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right content - Stats */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 shadow-xl">
              <div className="text-4xl font-extrabold text-white mb-1">500+</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Clients Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 shadow-xl">
              <div className="text-4xl font-extrabold text-white mb-1">95%</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Satisfaction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 shadow-xl">
              <div className="text-4xl font-extrabold text-white mb-1">$0</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Consultation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10 shadow-xl">
              <div className="text-4xl font-extrabold text-white mb-1">24/7</div>
              <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;