import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ContactForm, { decodeFormData } from "../Components/ContactForm";
import { ModalType } from "../App";

type Props = {
  setActiveModal: (type: ModalType) => void;
};

const SignPage: React.FC<Props> = ({ setActiveModal }) => {
  const [searchParams] = useSearchParams();
  const [prefillData, setPrefillData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const encodedData = searchParams.get("data");
    if (encodedData) {
      const decoded = decodeFormData(encodedData);
      if (decoded) {
        setPrefillData(decoded);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Signing Link</h2>
          <p className="text-gray-600 text-sm">
            This signing link appears to be invalid or expired. Please contact the agent who shared this link with you.
          </p>
        </div>
      </div>
    );
  }

  if (!prefillData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading your agreement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Simple header for customer view */}
      <div className="container mx-auto px-6 mb-8">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            GrowX <span className="text-green-600">Marketing</span>
          </h1>
        </div>
      </div>

      <ContactForm
        setActiveModal={setActiveModal}
        prefillData={prefillData}
        isCustomerMode={true}
      />
    </div>
  );
};

export default SignPage;
