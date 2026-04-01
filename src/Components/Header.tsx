import React, { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white py-4 px-6 shadow-sm sticky top-0 z-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src="/images/Logo-1.png" alt="Now Get Insured" className="h-16 w-auto" />
          </a>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#services" className="text-gray-700 hover:text-[#034365] font-medium transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#034365] font-medium transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-[#034365] font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-[#034365] font-medium transition-colors">Contact</a>

          </nav>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-2 pb-4 border-t border-gray-200">
          <a href="#services" className="block py-2 px-6 text-gray-700 hover:bg-gray-100">Services</a>
          <a href="#how-it-works" className="block py-2 px-6 text-gray-700 hover:bg-gray-100">How It Works</a>
          <a href="#testimonials" className="block py-2 px-6 text-gray-700 hover:bg-gray-100">Testimonials</a>
          <a href="#contact" className="block py-2 px-6 text-gray-700 hover:bg-gray-100">Contact</a>

        </div>
      )}
    </header>
  );
};

export default Header;