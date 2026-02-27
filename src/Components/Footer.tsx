import React from 'react';
import { ModalType } from '../App';

interface FooterProps {
  setActiveModal: (modal: ModalType) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveModal }) => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-gray-300">

          {/* About */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold text-[#1D184E] mb-4">
              SPEEDY QUOTE AUTO
            </h3>

            <p className="text-gray-600 max-w-xs">
              Get personalized auto insurance quotes quickly and easily.
              Potentially save money while getting the coverage you need.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-[#1D184E] mb-4">
                Get in Touch
              </h4>

              <ul className="space-y-3">

                {/* Phone */}
                <li>
                  <a
                    href="tel:+18889759214"
                    className="text-gray-600 hover:text-[#F26624] flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884l3.146-.393a1 1 0 01.95.553l1.516 3.032a1 1 0 01-.286 1.26l-1.27 1.27a11.042 11.042 0 005.516 5.516l1.27-1.27a1 1 0 011.26-.286l3.032 1.516a1 1 0 01.553.95l-.393 3.146A1 1 0 0117.657 22A19.657 19.657 0 012 4.343a1 1 0 01.003-1.459z" />
                    </svg>

                    +1 888-975-9214
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href="mailto:info@speedyquoteauto.org"
                    className="text-gray-600 hover:text-[#F26624] flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>

                    info@speedyquoteauto.org
                  </a>
                </li>

              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 text-center md:flex md:justify-between md:items-center">

          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Speedy Quote Auto. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center space-x-4">

            <button
              onClick={() => setActiveModal('privacy')}
              className="text-gray-600 hover:text-[#F26624] text-sm"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => setActiveModal('terms')}
              className="text-gray-600 hover:text-[#F26624] text-sm"
            >
              Terms and Conditions
            </button>

            <button
              onClick={() => setActiveModal('cookies')}
              className="text-gray-600 hover:text-[#F26624] text-sm"
            >
              Cookies
            </button>

            <button
              onClick={() => setActiveModal('california')}
              className="text-gray-600 hover:text-[#F26624] text-sm"
            >
              California Consumer Privacy
            </button>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
