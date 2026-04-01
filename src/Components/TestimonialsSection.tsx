import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Success Stories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          <div className="relative min-h-[450px] md:min-h-[300px]">
             <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 bg-white rounded-xl shadow-lg p-5 sm:p-8 md:p-10 border border-gray-100 flex flex-col md:flex-row items-center text-center md:text-left"
              >
                <div className="mb-4 md:mb-0 md:mr-8 flex justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-[#d1e9f1] flex-shrink-0">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 md:mb-4">
                    <svg className="text-[#72B9CA] w-8 h-8 md:w-10 md:h-10 mb-1 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 italic text-base md:text-lg leading-relaxed">{testimonials[activeIndex].quote}</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-bold text-gray-800">{testimonials[activeIndex].name}</p>
                    <p className="text-sm md:text-gray-600">{testimonials[activeIndex].position}, {testimonials[activeIndex].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg text-gray-600 hover:text-[#034365] transition-all hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 bg-white/90 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg text-gray-600 hover:text-[#034365] transition-all hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#034365] w-8" : "bg-gray-300 hover:bg-gray-400 w-3"
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