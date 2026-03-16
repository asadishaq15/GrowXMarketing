import React from "react";

type Service = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    id: 1,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
      </svg>
    ),
    title: "Digital Marketing Strategy",
    description:
      "Comprehensive digital marketing plans tailored to your business goals, target audience, and industry landscape.",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Search Engine Optimization",
    description:
      "Increase your organic visibility and drive quality traffic through targeted SEO strategies and content optimization.",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4v10z"
        />
      </svg>
    ),
    title: "Social Media Management",
    description:
      "Build and engage your audience across social platforms with strategic content creation and community management.",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7M9 11h6"
        />
      </svg>
    ),
    title: "Paid Advertising",
    description:
      "Maximize your ROI with targeted PPC campaigns across search, social, and display networks to reach your ideal customers.",
  },
  {
    id: 5,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7h16M4 11h10M4 15h7"
        />
      </svg>
    ),
    title: "Content Marketing",
    description:
      "Engage and convert your audience with compelling content that establishes your authority and drives customer action.",
  },
  {
    id: 6,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17v-6m6 6V9m-9 12h12a2 2 0 002-2V5H4v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Analytics & Reporting",
    description:
      "Track performance, gain insights, and make data-driven decisions with comprehensive analytics and transparent reporting.",
  },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer a comprehensive suite of marketing services to help your
          business reach new heights and achieve sustainable growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50 text-green-600">
                {service.icon}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {service.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;