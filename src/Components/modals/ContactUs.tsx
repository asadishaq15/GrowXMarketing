import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#034365]">Contact Us</h1>
      
      {isSubmitted ? (
        <div className="bg-[#e8f4f8] border border-[#a3d3e3] rounded-lg p-6 text-center">
          <svg className="w-16 h-16 text-[#467C9E] mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold text-[#034365] mb-2">Message Received!</h2>
          <p className="text-[#467C9E]">
            Thank you for reaching out. We'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#467C9E]"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#467C9E]"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#467C9E]"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#467C9E]"
                required
              >
                <option value="">Please select</option>
                <option value="quote">Insurance Quote</option>
                <option value="claim">Claims Inquiry</option>
                <option value="billing">Billing Question</option>
                <option value="support">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#467C9E]"
              required
            ></textarea>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-4">
              Fields marked with * are required.
            </p>
            
            <button
              type="submit"
              className="py-3 px-6 bg-gradient-to-r from-[#034365] to-[#467C9E] text-white font-bold rounded-md hover:opacity-90 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      )}
      
      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-bold text-[#034365] mb-4">Other Ways to Reach Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-[#72B9CA] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="font-bold text-gray-700">Our Address</h3>
              <p className="text-gray-600">
                123 Insurance Lane<br />
                Coverage City, IN 46001<br />
                United States
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <svg className="w-5 h-5 text-[#72B9CA] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <div>
              <h3 className="font-bold text-gray-700">Phone Numbers</h3>
              <p className="text-gray-600">
                General Inquiries: 1-800-555-AUTO<br />
                Claims Support: 1-800-555-CLAIM<br />
                Customer Service: 1-800-555-HELP
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <svg className="w-5 h-5 text-[#72B9CA] mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div>
              <h3 className="font-bold text-gray-700">Email Addresses</h3>
              <p className="text-gray-600">
                Info: info@speedyquoteauto.org<br />
                Support: support@speedyquoteauto.org<br />
                Claims: claims@speedyquoteauto.org
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;