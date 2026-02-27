import React from 'react';
import QuoteForm from './QuoteForm';

const HeroSection: React.FC = () => {
  return (
    <section
      id="quote-form"
      className="relative overflow-hidden bg-gray-100 py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">


          <div className="md:w-1/2 mb-8 md:mb-0">

            <h1 className="text-3xl md:text-5xl font-bold text-[#1D184E] mb-2">
              Find a great deal on car insurance with incredible coverage!
            </h1>

            {/* Phone Number */}
            <p className="text-lg md:text-xl font-semibold text-[#F26624] mb-6">
              Call Now:{' '}
              <a
                href="tel:+18889759214"
                className="underline hover:text-[#1D184E] transition-colors"
              >
                +1 888-975-9214
              </a>
            </p>

            <div className="space-y-4 text-gray-700">

              {/* Item 1 */}
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#F26624] mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Personalized Auto Coverage</p>
              </div>

              {/* Item 2 */}
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#F26624] mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Complete Coverage Analysis</p>
              </div>

              {/* Item 3 */}
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#F26624] mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Expert Insurance Guide</p>
              </div>

              {/* Item 4 */}
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#F26624] mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Honest, Transparent Policies</p>
              </div>

              {/* Item 5 */}
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-[#F26624] mt-1 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Fast, Easy Claims</p>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <QuoteForm />
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-[#ED2228] to-[#F26624] opacity-10 rounded-full -mr-32 -mb-32" />

      <div className="hidden md:block absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-[#1D184E] to-[#08509E] opacity-10 rounded-full -ml-48 -mt-48" />
    </section>
  );
};

export default HeroSection;
