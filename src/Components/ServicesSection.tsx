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
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8" />
      </svg>
    ),
    title: "Health Insurance",
    description:
      "Comprehensive health coverage plans including ACA marketplace plans, tailored to protect you and your family.",
  },
  {
    id: 2,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Plan Comparison",
    description:
      "Expert guidance to compare and find the best coverage options that fit your budget and healthcare needs.",
  },
  {
    id: 3,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4v10z" />
      </svg>
    ),
    title: "Enrollment Assistance",
    description:
      "Step-by-step support through the enrollment process, from application to activation of your coverage.",
  },
  {
    id: 4,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
    title: "Subsidies & Tax Credits",
    description:
      "Maximize your savings with expert help navigating Advance Premium Tax Credits and Cost Sharing Reductions.",
  },
  {
    id: 5,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    title: "Medicaid & CHIP",
    description:
      "Determine eligibility and get enrolled in Medicaid or CHIP programs for low-income individuals and families.",
  },
  {
    id: 6,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Ongoing Support",
    description:
      "Year-round assistance with claims, renewals, and plan changes. We're here whenever you need us.",
  },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Comprehensive insurance solutions to help you get the coverage you need at a price you can afford.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#72B9CA] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
            <div className="mb-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#e8f4f8] text-[#034365] group-hover:bg-[#034365] group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {service.title}
            </h3>

            <p className="text-gray-500 leading-relaxed text-sm">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;