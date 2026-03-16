import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";

type Props = {
  onClose: () => void;
};

type SignatureFormType = {
  fullName: string;
  email: string;
  date: string;
};

const SignatureModal: React.FC<Props> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<SignatureFormType>({
    fullName: "",
    email: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Responsive canvas
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Set the canvas width and height and scale for crisp drawing
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

  // Drawing logic
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    draw(e, false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    draw(e, true);
  };

  const handlePointerUp = () => {
    setDrawing(false);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>, drawLine: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Support both touch and mouse
    const clientX = e.type.startsWith("touch")
      ? (e as any).touches?.[0]?.clientX ?? 0
      : e.clientX;
    const clientY = e.type.startsWith("touch")
      ? (e as any).touches?.[0]?.clientY ?? 0
      : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (!drawLine) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const isCanvasEmpty = (): boolean => {
    if (!canvasRef.current) return true;
    const { width, height } = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return true;
    const pixels = ctx.getImageData(0, 0, width, height);
    // If any pixel is non-transparent, it's not empty
    for (let i = 0; i < pixels.data.length; i += 4) {
      if (pixels.data[i + 3] !== 0) return false;
    }
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isCanvasEmpty()) {
      setError("Please provide your signature before submitting.");
      return;
    }
    // Optionally, you could get the actual PNG data for backend
    const signatureData = canvasRef.current?.toDataURL() ?? "";
    // Submit to backend here
    console.log({ ...formData, signature: signatureData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700">E-Signature Agreement</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200"
            aria-label="Close"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            By signing this agreement, you authorize GrowX Marketing Services to proceed with the selected marketing services
            and acknowledge that you have read and agreed to our terms of service and privacy policy.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Legal Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Signature*</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-1">
                <canvas
                  ref={canvasRef}
                  className="w-full h-40 bg-white touch-none"
                  style={{ touchAction: "none" }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-gray-600 hover:text-green-600"
                >
                  Clear Signature
                </button>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-300"
              >
                Submit Agreement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;