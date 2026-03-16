import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./Components/modals/PrivacyPolicy";
import TermsConditions from "./Components/modals/TermsAndConditions";
import CookiePolicy from "./Components/modals/Cookies";
import LandingPage from "./pages/LandingPage";
import SignPage from "./pages/SignPage";

export type ModalType = "privacy" | "terms" | "cookies" | null;

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const renderModal = () => {
    switch (activeModal) {
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
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage setActiveModal={setActiveModal} />} />
          <Route path="/sign" element={<SignPage setActiveModal={setActiveModal} />} />
        </Routes>
        {renderModal()}
      </div>
    </BrowserRouter>
  );
};

export default App;