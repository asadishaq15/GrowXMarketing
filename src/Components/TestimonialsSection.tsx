import React, { useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  company: string;
  position: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    company: "TechNova Solutions",
    position: "Marketing Director",
    quote: "They transformed our digital presence completely. Their strategic approach and attention to detail helped us increase our lead generation by 45% in just three months.",
    image: "/images/jesica.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "Apex Retail",
    position: "CEO",
    quote: "Working with this team has been a game-changer for our e-commerce business. Their data-driven approach to marketing has helped us achieve a 62% increase in online sales and a 3x ROI on our ad spend.",
    image: "/images/Michael.jpg",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    company: "Wellness Redefined",
    position: "Founder",
    quote: "As a startup, we needed a marketing partner that understood our vision and could help us reach our target audience effectively. They delivered beyond our expectations, helping us establish a solid brand presence.",
    image: "/images/Sarah.jpg",
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 flex-shrink-0">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <svg className="text-green-200 w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 italic text-lg">{testimonials[activeIndex].quote}</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">{testimonials[activeIndex].name}</p>
                  <p className="text-gray-600">{testimonials[activeIndex].position}, {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-green-600 w-8" : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;