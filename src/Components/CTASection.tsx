import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 text-[#034365]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-8L4 8v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm0-4h-2V8h2v6zm6 4h-2v-2h2v2zm0-4h-2V8h2v6z"/>
              </svg>
            </div>

            <h3 className="text-xl font-bold text-[#034365] mb-3">
              Contact Us
            </h3>

            <p className="text-gray-600">
              Reach out to us for personalized options tailored to your needs.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 text-[#034365]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>

            <h3 className="text-xl font-bold text-[#034365] mb-3">
              Get Your Quote
            </h3>

            <p className="text-gray-600">
              Provide basic info, receive quotes, and pick the plan that suits your budget.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 mb-6 text-[#034365]">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>

            <h3 className="text-xl font-bold text-[#034365] mb-3">
              Secure Your Coverage
            </h3>

            <p className="text-gray-600">
              Choose your plan, complete the process, and start living with confidence!
            </p>
          </div>

        </div>

        {/* Phone CTA */}
        <div className="text-center mt-10">
          <p className="text-lg font-semibold text-[#034365] mb-4">
            Prefer to talk? Call us now:
          </p>

          <a
            href="tel:+18889759214"
            className="text-xl font-bold text-[#467C9E] hover:text-[#034365] hover:underline transition-colors"
          >
            +1 888-975-9214
          </a>
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              const quoteFormSection = document.getElementById('quote-form');
              if (quoteFormSection) {
                quoteFormSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }
            }}
            className="py-3 px-8 bg-gradient-to-r from-[#034365] to-[#467C9E] text-white font-bold rounded-md hover:opacity-90 transition duration-200 inline-flex items-center"
          >
            Get a Quote

            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
