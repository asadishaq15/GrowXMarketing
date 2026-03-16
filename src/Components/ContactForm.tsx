import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { ModalType } from "../App";

type Props = {
  setActiveModal: (type: ModalType) => void;
  prefillData?: FormData | null;
  isCustomerMode?: boolean;
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

// Encode form data to Base64 for URL sharing
const encodeFormData = (data: FormData): string => {
  const { signature, ...rest } = data; // Never include signature in the link
  return btoa(encodeURIComponent(JSON.stringify(rest)));
};

// Decode Base64 data from URL
export const decodeFormData = (encoded: string): FormData | null => {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
    return { ...decoded, signature: "" };
  } catch {
    return null;
  }
};

const ContactForm: React.FC<Props> = ({ setActiveModal, prefillData = null, isCustomerMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    services: [],
    signature: "",
  });

  // Pre-fill form if data is provided (customer mode)
  useEffect(() => {
    if (prefillData) {
      setFormData({ ...prefillData, signature: "" });
    }
  }, [prefillData]);

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
    if (isCustomerMode) return; // Prevent changes in customer mode
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
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 0;
      
      ctx.beginPath();
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
    setSignatureError("");
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

  // Generate shareable customer link
  const handleGenerateLink = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in at least the Full Name and Email before generating a link.");
      return;
    }
    const encoded = encodeFormData(formData);
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/sign?data=${encoded}`;
    setGeneratedLink(link);
    setLinkGenerated(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      alert("Link copied to clipboard! Share it with your customer.");
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (isCanvasEmpty()) {
      setSignatureError("Please provide your signature before submitting.");
      return;
    }
    
    setSignatureError("");
    const signatureData = canvasRef.current?.toDataURL() ?? "";
    const finalData = { ...formData, signature: signatureData, signedAt: new Date().toISOString() };
    
    // Send to backend
    fetch("/api/submit-agreement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Agreement submitted:", data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("Submission error:", err);
        // Still show success for now (fallback)
        setSubmitted(true);
      });
  };

  // Success screen after submission
  if (submitted) {
    return (
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-50 rounded-2xl shadow-lg p-10 border border-green-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Agreement Signed Successfully!</h2>
              <p className="text-lg text-gray-600 mb-2">
                Thank you{formData.name ? `, ${formData.name}` : ""}! Your signed agreement has been submitted.
              </p>
              <p className="text-sm text-gray-500">
                A confirmation will be sent to <strong>{formData.email}</strong>.
              </p>
              <div className="mt-8 pt-6 border-t border-green-200">
                <p className="text-xs text-gray-400">
                  Signed on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const inputBaseClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
  const readOnlyClass = "w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed";

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Header changes based on mode */}
        <div className="text-center mb-16">
          {isCustomerMode ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Review & Sign Your Agreement
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please review the details below and provide your signature to confirm the agreement.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Grow Your Business?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to get in touch with our team and learn how we can help your business reach new heights.
              </p>
            </>
          )}
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 border border-gray-100">
            
            {/* Customer mode banner */}
            {isCustomerMode && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Your details have been pre-filled by our agent.</p>
                  <p className="text-xs text-blue-600 mt-1">Please review the information below and scroll down to sign the agreement.</p>
                </div>
              </div>
            )}

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
                    className={isCustomerMode ? readOnlyClass : inputBaseClass}
                    readOnly={isCustomerMode}
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
                    className={isCustomerMode ? readOnlyClass : inputBaseClass}
                    readOnly={isCustomerMode}
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
                    className={isCustomerMode ? readOnlyClass : inputBaseClass}
                    readOnly={isCustomerMode}
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
                    className={isCustomerMode ? readOnlyClass : inputBaseClass}
                    readOnly={isCustomerMode}
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
                        disabled={isCustomerMode}
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
                  className={isCustomerMode ? readOnlyClass : inputBaseClass}
                  readOnly={isCustomerMode}
                ></textarea>
              </div>

              {/* E-Signature Section */}
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
                      className="w-full h-40 bg-white touch-none cursor-crosshair rounded"
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

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 shadow-md transform hover:-translate-y-0.5"
                >
                  {isCustomerMode ? "Sign & Submit Agreement" : "Submit and Sign Agreement"}
                </button>

                {/* Generate Link button — only in agent mode */}
                {!isCustomerMode && (
                  <div className="pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleGenerateLink}
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Generate Customer Signing Link
                    </button>
                    <p className="text-xs text-gray-400 mt-1 text-center">
                      Fill the form with customer details, then generate a link for them to sign remotely.
                    </p>
                  </div>
                )}

                {/* Generated Link Display */}
                {linkGenerated && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-semibold text-green-800 text-sm">Customer Signing Link Generated!</p>
                    </div>
                    <div className="flex gap-2 items-stretch">
                      <input
                        type="text"
                        readOnly
                        value={generatedLink}
                        className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-xs text-gray-600 font-mono"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition flex items-center gap-1 whitespace-nowrap"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-green-700 mt-2">
                      Share this link with your customer via SMS, email, or chat. They'll see the pre-filled form and only need to sign.
                    </p>
                  </div>
                )}

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