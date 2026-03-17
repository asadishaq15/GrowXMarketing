import React, { useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback } from "react";
import { ModalType } from "../App";

type Props = {
  setActiveModal: (type: ModalType) => void;
  prefillData?: FormData | null;
  isCustomerMode?: boolean;
};

type FormData = {
  // Personal Info
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  annualIncome: string;
  incomeRange: string;
  ssn: string;
  ssnVerification: string;
  phone: string;
  email: string;
  maritalStatus: string;
  hasDependents: string;
  employerName: string;
  employmentStatus: string;
  ipAddress: string;
  // Location Info
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  county: string;
  previousCounty: string;
  previousState: string;
  // Compliance
  agreeEnrollment: boolean;
  // Signatures (stored as base64)
  signature1: string;
  signature1Timestamp: string;
  signature2: string;
  signature2Timestamp: string;
};

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming"
];

const STATE_ABBR = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY",
  "LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND",
  "OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

const INCOME_RANGES = [
  "FAMILY OF 1: $0 - $14,580",
  "FAMILY OF 1: $14,581 - $20,800",
  "FAMILY OF 1: $20,801 - $21,600",
  "FAMILY OF 1: $21,601 - $29,160",
  "FAMILY OF 1: $29,161 - $36,450",
  "FAMILY OF 2: $0 - $19,720",
  "FAMILY OF 2: $19,721 - $28,120",
  "FAMILY OF 2: $28,121 - $39,440",
  "FAMILY OF 2: $39,441 - $49,300",
  "FAMILY OF 3: $0 - $24,860",
  "FAMILY OF 3: $24,861 - $35,440",
  "FAMILY OF 3: $35,441 - $49,720",
  "FAMILY OF 3: $49,721 - $62,150",
  "FAMILY OF 4: $0 - $30,000",
  "FAMILY OF 4: $30,001 - $42,760",
  "FAMILY OF 4: $42,761 - $60,000",
  "FAMILY OF 4: $60,001 - $75,000",
];

const EMPTY_FORM: FormData = {
  firstName: "", lastName: "", dob: "", gender: "", annualIncome: "",
  incomeRange: "", ssn: "", ssnVerification: "", phone: "", email: "",
  maritalStatus: "", hasDependents: "", employerName: "", employmentStatus: "",
  ipAddress: "", address: "", city: "", state: "", postalCode: "", country: "US",
  county: "", previousCounty: "", previousState: "", agreeEnrollment: false,
  signature1: "", signature1Timestamp: "", signature2: "", signature2Timestamp: "",
};

// Encode form data to Base64 for URL sharing
const encodeFormData = (data: FormData): string => {
  const { signature1, signature2, signature1Timestamp, signature2Timestamp, ...rest } = data;
  return btoa(encodeURIComponent(JSON.stringify(rest)));
};

// Decode Base64 data from URL
export const decodeFormData = (encoded: string): FormData | null => {
  try {
    const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
    return { ...EMPTY_FORM, ...decoded, signature1: "", signature2: "", signature1Timestamp: "", signature2Timestamp: "" };
  } catch {
    return null;
  }
};

// ─── Signature Canvas Hook ──────────────────────────────────────────────
function useSignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const [, forceUpdate] = useState(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(ratio, ratio);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    pointsRef.current = [{ x: e.clientX - rect.left, y: e.clientY - rect.top }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointsRef.current.push({ x, y });

    if (pointsRef.current.length > 2) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      const pts = pointsRef.current;
      const p1 = pts[pts.length - 3];
      const p2 = pts[pts.length - 2];
      const p3 = pts[pts.length - 1];
      const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      const mid2 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
      ctx.moveTo(mid1.x, mid1.y);
      ctx.quadraticCurveTo(p2.x, p2.y, mid2.x, mid2.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    pointsRef.current = [];
  };

  const clear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    forceUpdate((n) => n + 1);
  };

  const isEmpty = (): boolean => {
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

  const toDataURL = () => canvasRef.current?.toDataURL() ?? "";

  return { canvasRef, handlePointerDown, handlePointerMove, handlePointerUp, clear, isEmpty, toDataURL };
}

// ─── TCPA / Consent Text ───────────────────────────────────────────────
const TCPA_TEXT = `Health Insurance Consent and Acknowledgment Form

Client Authorization Statement

Authorized Agents
The following agents are authorized to provide health insurance services on my behalf:
• Rocky Breeden
• NPN: 18927989
• Email: rocky.breeden@honornglory.com
• Phone: +1 865 803 6960

AUTHORIZATION AND AGENT OF RECORD APPOINTMENT
I, the undersigned applicant, authorize the above named agent to act as my Agent of Record and health insurance agent or broker for myself and, if applicable, my household. I authorize this agent to access my information through the Health Insurance Marketplace and to submit my application, eligibility attestations, and plan selection on my behalf for the current coverage year and, if applicable, future re-enrollment periods, unless revoked by me.

This authorization applies to enrollment in Qualified Health Plans offered through the Federally Facilitated Marketplace and, when applicable, to applications for insurance affordability programs including Advance Premium Tax Credits, Cost Sharing Reductions, Medicaid, and CHIP.

SCOPE OF AUTHORIZATION
By providing this consent, I authorize the agent to use my information, whether provided electronically, in writing, or verbally, for the following purposes:
• Searching for an existing Marketplace application
• Completing and submitting an application for eligibility and enrollment
• Assisting with plan comparison and selection
• Providing account maintenance and ongoing enrollment support
• Responding to Marketplace or carrier inquiries related to my application or coverage

COMMUNICATION CONSENT
I consent to be contacted by the authorized agent by phone, email, text message, or other electronic communication methods for purposes related to health insurance enrollment, coverage confirmation, account servicing, and compliance requirements. I understand that consent to communication is not a condition of enrollment or coverage.

PLAN REVIEW AND ATTESTATION
I confirm that I have reviewed the information provided in my application, including plan options and eligibility information, and I authorize submission of my selected health insurance plan based on the information I have provided.

AFFIRMATION OF INFORMATION ACCURACY
I affirm that all information provided for my application is true and accurate to the best of my knowledge. I understand that providing inaccurate or incomplete information may affect eligibility or financial assistance.

PRIVACY AND USE OF PERSONAL INFORMATION
I understand that my Personally Identifiable Information will be used solely for enrollment and servicing purposes as described above and will be safeguarded in accordance with applicable privacy and security requirements.

REVOCATION OF CONSENT
I understand that I may revoke this authorization or request cancellation of my health insurance plan at any time by contacting the authorized agent by phone at +1 865 803 6960 or by email at rocky.breeden@honornglory.com. I acknowledge that revocation requests must be communicated through these methods to ensure proper processing.

Primary Writing Agents authorized for health insurance services:
• Rocky Breeden
• NPN: 18927989
• Email: rocky.breeden@honornglory.com
• Phone: +1 865 803 6960`;


// ─── Main Component ───────────────────────────────────────────────────
const ContactForm: React.FC<Props> = ({ setActiveModal, prefillData = null, isCustomerMode = false }) => {
  const sig1 = useSignatureCanvas();
  const sig2 = useSignatureCanvas();
  const [signatureError, setSignatureError] = useState("");
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });

  useEffect(() => {
    if (prefillData) {
      setFormData({ ...EMPTY_FORM, ...prefillData, signature1: "", signature2: "", signature1Timestamp: "", signature2Timestamp: "", agreeEnrollment: false });
    }
  }, [prefillData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (isCustomerMode && e.target.name !== "agreeEnrollment") return;
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerateLink = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill in at least First Name, Last Name, and Email before generating a link.");
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

  const formatTimestamp = (): string => {
    return new Date().toLocaleString("en-US", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      timeZoneName: "short",
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (sig1.isEmpty()) {
      setSignatureError("Please provide your authorization signature (Signature 1).");
      return;
    }
    if (sig2.isEmpty()) {
      setSignatureError("Please provide your application review signature (Signature 2).");
      return;
    }
    if (!formData.agreeEnrollment) {
      setSignatureError("Please agree to be enrolled before submitting.");
      return;
    }

    setSignatureError("");
    const now = formatTimestamp();
    const finalData = {
      ...formData,
      signature1: sig1.toDataURL(),
      signature1Timestamp: now,
      signature2: sig2.toDataURL(),
      signature2Timestamp: now,
    };

    fetch("/api/submit-agreement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Agreement submitted:", data);
        setFormData(finalData);
        setSubmitted(true);
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setFormData(finalData);
        setSubmitted(true);
      });
  };

  // ─── Success Screen ───────────────────────────────
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Enrollment Signed Successfully!</h2>
              <p className="text-lg text-gray-600 mb-2">
                Thank you, {formData.firstName} {formData.lastName}! Your signed enrollment agreement has been submitted.
              </p>
              <p className="text-sm text-gray-500">
                A confirmation will be sent to <strong>{formData.email}</strong>.
              </p>
              <div className="mt-8 pt-6 border-t border-green-200">
                <p className="text-xs text-gray-400">
                  Signed on {formData.signature1Timestamp || formatTimestamp()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = isCustomerMode
    ? "w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed text-sm"
    : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm";
  const selectClass = isCustomerMode
    ? "w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed text-sm appearance-none"
    : "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  // ─── Render ────────────────────────────────────────
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          {isCustomerMode ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Review &amp; Sign Your Enrollment
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please review the details below, read the consent statement, and provide your signatures.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Enrollment Form</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the client's information below. You can generate a signing link for the customer to review and sign remotely.
              </p>
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Customer mode banner */}
            {isCustomerMode && (
              <div className="p-4 bg-blue-50 border-b border-blue-200 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Your details have been pre-filled by our agent.</p>
                  <p className="text-xs text-blue-600 mt-1">Please review the information, read the consent statement, and scroll down to sign.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

              {/* ════════════ SECTION 1: Personal Info ════════════ */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">1</span>
                  Personal Information
                </h3>
                <div className="h-px bg-gray-200 mb-5 mt-2"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className={labelClass}>First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                      placeholder="Sherry" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name <span className="text-red-500">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                      placeholder="Mckinnies" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Date of Birth <span className="text-red-500">*</span></label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                      className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Projected Annual Income <span className="text-red-500">*</span></label>
                    <input type="text" name="annualIncome" value={formData.annualIncome} onChange={handleChange}
                      placeholder="20801" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Income Range (Based on Household) <span className="text-red-500">*</span></label>
                    <select name="incomeRange" value={formData.incomeRange} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select Income Range</option>
                      {INCOME_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Social Security Number <span className="text-red-500">*</span></label>
                    <input type="text" name="ssn" value={formData.ssn} onChange={handleChange}
                      placeholder="XXX-XX-XXXX" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>SSN Verification Status <span className="text-red-500">*</span></label>
                    <select name="ssnVerification" value={formData.ssnVerification} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select Status</option>
                      <option value="Valid SSN">Valid SSN</option>
                      <option value="Invalid SSN">Invalid SSN</option>
                      <option value="Pending Verification">Pending Verification</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Phone <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="+18433337678" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="sherryferris814@gmail.com" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Marital Status <span className="text-red-500">*</span></label>
                    <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Do you have tax dependents? <span className="text-red-500">*</span></label>
                    <select name="hasDependents" value={formData.hasDependents} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Employer / Company Name <span className="text-red-500">*</span></label>
                    <input type="text" name="employerName" value={formData.employerName} onChange={handleChange}
                      placeholder="Tabor commons" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Employment Status <span className="text-red-500">*</span></label>
                    <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select Status</option>
                      <option value="Employed">Employed</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Retired">Retired</option>
                      <option value="Student">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>IP Address</label>
                    <input type="text" name="ipAddress" value={formData.ipAddress} onChange={handleChange}
                      placeholder="206.195.67.81" className={inputClass} readOnly={isCustomerMode} />
                  </div>
                </div>
              </div>

              {/* ════════════ SECTION 2: Location Info ════════════ */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">2</span>
                  Location Information
                </h3>
                <div className="h-px bg-gray-200 mb-5 mt-2"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Address <span className="text-red-500">*</span></label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange}
                      placeholder="152 lida lane" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                      placeholder="Loris" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>State <span className="text-red-500">*</span></label>
                    <select name="state" value={formData.state} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="">Select State</option>
                      {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Postal Code <span className="text-red-500">*</span></label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange}
                      placeholder="29569" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Country <span className="text-red-500">*</span></label>
                    <select name="country" value={formData.country} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode} required>
                      <option value="US">US</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>County <span className="text-red-500">*</span></label>
                    <input type="text" name="county" value={formData.county} onChange={handleChange}
                      placeholder="Horry County" className={inputClass} readOnly={isCustomerMode} required />
                  </div>
                  <div>
                    <label className={labelClass}>Previous County</label>
                    <input type="text" name="previousCounty" value={formData.previousCounty} onChange={handleChange}
                      placeholder="Marlboro County" className={inputClass} readOnly={isCustomerMode} />
                  </div>
                  <div>
                    <label className={labelClass}>Previous State</label>
                    <select name="previousState" value={formData.previousState} onChange={handleChange}
                      className={selectClass} disabled={isCustomerMode}>
                      <option value="">Select State</option>
                      {STATE_ABBR.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ════════════ SECTION 3: Compliance Consent ════════════ */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">3</span>
                  Compliance Consent Statement
                </h3>
                <div className="h-px bg-gray-200 mb-5 mt-2"></div>

                <div className="text-xs text-gray-500 mb-3">Assigned Agent Details: <span className="font-semibold text-gray-700">Agent Consent</span></div>

                <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 max-h-72 overflow-y-auto mb-5">
                  <pre className="whitespace-pre-wrap text-xs text-gray-700 leading-relaxed font-sans">
                    {TCPA_TEXT}
                  </pre>
                </div>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="agreeEnrollment"
                    checked={formData.agreeEnrollment}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to be enrolled in the ACA plan I have chosen and authorize the licensed agent to process my enrollment request.
                  </span>
                </label>
              </div>

              {/* ════════════ SECTION 4: Signature & Verification ════════════ */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">4</span>
                  Signature &amp; Verification
                </h3>
                <div className="h-px bg-gray-200 mb-5 mt-2"></div>

                {/* Signature 1 */}
                <div className="mb-6">
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Signature 1:</strong> By affixing your signature below, you hereby confirm that you have reviewed and understand the contents of the email regarding our health insurance policy recommendation for your Marketplace application. You further attest that the information you provided is accurate to the best of your knowledge. You understand that by signing this document, you are authorizing to submit your application for said health insurance.
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Signature *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-1 bg-gray-50">
                    <canvas
                      ref={sig1.canvasRef}
                      className="w-full h-32 bg-white touch-none cursor-crosshair rounded"
                      style={{ touchAction: "none" }}
                      onPointerDown={sig1.handlePointerDown}
                      onPointerMove={sig1.handlePointerMove}
                      onPointerUp={sig1.handlePointerUp}
                      onPointerLeave={sig1.handlePointerUp}
                    />
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {formData.signature1Timestamp ? `Time Signed: ${formData.signature1Timestamp}` : "Not yet signed"}
                    </span>
                    <button type="button" onClick={sig1.clear} className="text-xs text-gray-500 hover:text-green-600 transition-colors">
                      Clear
                    </button>
                  </div>
                </div>

                {/* Signature 2 */}
                <div>
                  <p className="text-sm text-gray-700 mb-3">
                    <strong>Signature 2:</strong> I have reviewed and read all pages of my application information above, and here is my signature.
                  </p>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Signature *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-1 bg-gray-50">
                    <canvas
                      ref={sig2.canvasRef}
                      className="w-full h-32 bg-white touch-none cursor-crosshair rounded"
                      style={{ touchAction: "none" }}
                      onPointerDown={sig2.handlePointerDown}
                      onPointerMove={sig2.handlePointerMove}
                      onPointerUp={sig2.handlePointerUp}
                      onPointerLeave={sig2.handlePointerUp}
                    />
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      {formData.signature2Timestamp ? `Time Signed: ${formData.signature2Timestamp}` : "Not yet signed"}
                    </span>
                    <button type="button" onClick={sig2.clear} className="text-xs text-gray-500 hover:text-green-600 transition-colors">
                      Clear
                    </button>
                  </div>
                </div>

                {signatureError && <p className="text-red-500 text-sm mt-3">{signatureError}</p>}
              </div>

              {/* ════════════ ACTION BUTTONS ════════════ */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md transition duration-300 shadow-md"
                >
                  {isCustomerMode ? "Sign & Submit Enrollment" : "Submit Enrollment"}
                </button>

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
                      Fill the form with client details, then generate a link for them to review, sign, and submit remotely.
                    </p>
                  </div>
                )}

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
                        type="text" readOnly value={generatedLink}
                        className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-md text-xs text-gray-600 font-mono"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                      <button type="button" onClick={handleCopyLink}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-md hover:bg-green-700 transition flex items-center gap-1 whitespace-nowrap">
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
                  <button type="button" onClick={() => setActiveModal("terms")}
                    className="text-green-600 underline hover:text-green-800">Terms &amp; Conditions</button>{" "}
                  and{" "}
                  <button type="button" onClick={() => setActiveModal("privacy")}
                    className="text-green-600 underline hover:text-green-800">Privacy Policy</button>
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