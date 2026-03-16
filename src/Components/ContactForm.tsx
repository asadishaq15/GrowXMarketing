import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { ModalType } from "../App";

type Props = {
  setActiveModal: (type: ModalType) => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  services: string[];
  signature: string;
};

const allServices = [
  "Digital Marketing Strategy",
  "Search Engine Optimization",
  "Social Media Management",
  "Paid Advertising",
  "Content Marketing",
  "Analytics & Reporting",
];

const ContactForm: React.FC<Props> = ({ setActiveModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    services: [],
    signature: "",
  });

  // Responsive canvas logic
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(ratio, ratio);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === "checkbox") {
      setFormData((prev) => {
        const services = [...prev.services];
        if (checked) {
          services.push(value);
        } else {
          const idx = services.indexOf(value);
          if (idx !== -1) services.splice(idx, 1);
        }
        return { ...prev, services };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Points for smoothing logic
  const points = useRef<{ x: number, y: number }[]>([]);

  // Drawing logic
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // Use coordinates relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    points.current = [{ x, y }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    points.current.push({ x, y });

    if (points.current.length > 2) {
      // Premium pen settings - must reset per stroke for consistency
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 0; // Remove potentially distorting shadow
      
      ctx.beginPath();
      // Start at midpoint of first two points
      const p1 = points.current[points.current.length - 3];
      const p2 = points.current[points.current.length - 2];
      const p3 = points.current[points.current.length - 1];
      
      const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };

      ctx.moveTo(mid1.x, mid1.y);
      ctx.quadraticCurveTo(p2.x, p2.y, mid2.x, mid2.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    if (drawing) {
      setDrawing(false);
      points.current = [];
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setFormData(prev => ({ ...prev, signature: "" }));
      points.current = [];
    }
  };

  const isCanvasEmpty = (): boolean => {
    if (!canvasRef.current) return true;
    const { width, height } = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return true;
    const pixels = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < pixels.data.length; i += 4) {
      if (pixels.data[i + 3] !== 0) return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (isCanvasEmpty()) {
      setSignatureError("Please provide your signature before submitting.");
      return;
    }
    
    setSignatureError("");
    const signatureData = canvasRef.current?.toDataURL() ?? "";
    const finalData = { ...formData, signature: signatureData };
    
    console.log("Form Submitted:", finalData);
    alert("Thank you! Your request and signed agreement have been submitted.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      services: [],
      signature: "",
    });
    handleClear();
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Grow Your Business?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to get in touch with our team and learn how we can help your business reach new heights.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services You&apos;re Interested In (select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {allServices.map((service) => (
                    <div key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        id={service.replace(/\s+/g, "-").toLowerCase()}
                        name="services"
                        value={service}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        checked={formData.services.includes(service)}
                      />
                      <label
                        htmlFor={service.replace(/\s+/g, "-").toLowerCase()}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your project or goals
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">E-Signature Agreement</h3>
                <p className="text-sm text-gray-600 mb-4">
                  By signing below, you authorize GrowX Marketing Services to proceed with the selected marketing services
                  and acknowledge that you have read and agreed to our terms of service and privacy policy.
                </p>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Signature*</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-1 bg-gray-50">
                    <canvas
                      ref={canvasRef}
                      className="w-full h-40 bg-white touch-none cursor-crosshair"
                      style={{ touchAction: "none" }}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                    />
                  </div>
                  {signatureError && <p className="text-red-500 text-sm mt-1">{signatureError}</p>}
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Clear Signature
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 shadow-md transform hover:-translate-y-0.5"
                >
                  Submit and Sign Agreement
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  By submitting this form, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => setActiveModal("terms")}
                    className="text-green-600 underline hover:text-green-800"
                  >
                    Terms &amp; Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => setActiveModal("privacy")}
                    className="text-green-600 underline hover:text-green-800"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;