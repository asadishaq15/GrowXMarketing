import React from "react";
import { ModalType } from "../App";

type Props = {
  setActiveModal: (type: ModalType) => void;
};

const Footer: React.FC<Props> = ({ setActiveModal }) => {
  return (
    <footer className="bg-[#034365] text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between mb-12">
          <div className="mb-8 lg:mb-0 lg:w-1/3 pr-4">
            <div className="flex items-center mb-4">
              <img src="/images/Logo-1.png" alt="Now Get Insured" className="h-20 w-auto" />
            </div>
            <p className="text-gray-300 mb-4">
              Expert health insurance solutions to help you find affordable coverage through the ACA marketplace, Medicaid, and more.
            </p>

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:w-2/3">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Health Insurance</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Plan Comparison</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Enrollment Assistance</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Subsidies & Tax Credits</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Medicaid & CHIP</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-300 hover:text-[#72B9CA] transition-colors">How It Works</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Contact</a></li>
                <li><a href="#testimonials" className="text-gray-300 hover:text-[#72B9CA] transition-colors">Testimonials</a></li>
                <li>
                  <button onClick={() => setActiveModal("privacy")} className="text-gray-300 hover:text-[#72B9CA] transition-colors">Privacy Policy</button>
                </li>
                <li>
                  <button onClick={() => setActiveModal("terms")} className="text-gray-300 hover:text-[#72B9CA] transition-colors">Terms &amp; Conditions</button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-300 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:info@nowgetinsured.com" className="text-gray-300 hover:text-[#72B9CA] transition-colors">info@nowgetinsured.com</a>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#467C9E]/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Now Get Insured. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <button onClick={() => setActiveModal("privacy")} className="text-gray-300 hover:text-[#72B9CA] transition-colors">Privacy</button>
              <button onClick={() => setActiveModal("terms")} className="text-gray-300 hover:text-[#72B9CA] transition-colors">Terms</button>
              <button onClick={() => setActiveModal("cookies")} className="text-gray-300 hover:text-[#72B9CA] transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;