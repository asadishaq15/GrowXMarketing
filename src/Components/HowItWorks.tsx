import React from "react";

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We start with a deep-dive into your healthcare needs, budget, and coverage requirements to find the right plan.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Plan Selection",
    description: "Our experts compare plans and help you choose the best coverage option with maximum savings and benefits.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Enrollment & Coverage",
    description: "We handle the enrollment process and ensure your coverage is activated so you can start benefiting right away.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="py-20 bg-[#e8f4f8]">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-800 mb-4">
        How It Works
      </h2>
      <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
        A simple, proven process to get you the insurance coverage you need.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="w-20 h-20 rounded-full bg-[#d1e9f1] flex items-center justify-center text-[#034365] mb-6 group-hover:bg-[#034365] group-hover:text-white transition-colors duration-300">
              {step.icon}
            </div>
            <div className="text-xs font-bold text-[#034365] tracking-widest mb-2">STEP {step.number}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <a
          href="#contact"
          className="bg-[#034365] hover:bg-[#023556] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <span>GET STARTED</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorks;
