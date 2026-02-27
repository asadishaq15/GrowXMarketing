import React, { useState } from 'react';

const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    model: '',
    submodel: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-[#1D184E] mb-6">
        Potential Save on Auto Insurance, Get Covered!
      </h2>

      <div>
        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Brand:
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08509E]"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Year:
        </label>
        <select
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08509E]"
          required
        >
          <option value="">Select an option...</option>
          {[...Array(30)].map((_, i) => (
            <option key={i} value={2026 - i}>{2026 - i}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Model:
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08509E]"
          required
        />
      </div>

      <div>
        <label htmlFor="submodel" className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Submodel:
        </label>
        <input
          type="text"
          id="submodel"
          name="submodel"
          value={formData.submodel}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08509E]"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#ED2228] to-[#F26624] text-white font-bold rounded-md hover:opacity-90 transition duration-200 flex justify-center items-center mb-2"
        >
          Get a Quote
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <p className="text-[10px] text-gray-500 leading-tight text-center">
          By clicking "Get a Quote", I agree to the <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>. I also give my express written consent to be contacted by Speedy Quote Auto and its partners via automated technology (including calls, texts, and emails) even if I am on a Do Not Call list. Consent is not a condition of purchase.
        </p>
      </div>
    </form>
  );
};

export default QuoteForm;