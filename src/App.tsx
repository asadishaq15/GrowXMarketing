import React, { useState } from "react";
import SignatureModal from "./Components/modals/SignatureModal";
import PrivacyPolicy from "./Components/modals/PrivacyPolicy";
import TermsConditions from "./Components/modals/TermsAndConditions";
import CookiePolicy from "./Components/modals/Cookies";
import LandingPage from "./pages/LandingPage";

// Local components (paste these below or split into files as needed)

export type ModalType = "signature" | "privacy" | "terms" | "cookies" | null;

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const renderModal = () => {
    switch (activeModal) {
      case "signature":
        return <SignatureModal onClose={() => setActiveModal(null)} />;
      case "privacy":
        return <PrivacyPolicy onClose={() => setActiveModal(null)} />;
      case "terms":
        return <TermsConditions onClose={() => setActiveModal(null)} />;
      case "cookies":
        return <CookiePolicy onClose={() => setActiveModal(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <LandingPage setActiveModal={setActiveModal} />
      {renderModal()}
    </div>
  );
};

export default App;