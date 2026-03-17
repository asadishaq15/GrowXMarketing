import React from "react";
import Modal from "../Modal";

type Props = {
  onClose: () => void;
};

const TermsConditions: React.FC<Props> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <div className="prose max-w-none">
      <h2>Terms and Conditions</h2>
      <p>Last Updated: March 16, 2026</p>
      <h3>1. Agreement to Terms</h3>
      <p>
        By accessing or using Apex Digital Services, you agree to be bound by these Terms and Conditions.
        If you disagree with any part of the terms, you may not access our services.
      </p>
      <h3>2. Description of Services</h3>
      <p>
        Apex Digital Services provides various marketing services including digital marketing strategy,
        search engine optimization, social media management, paid advertising, content marketing, and analytics & reporting.
      </p>
      <h3>3. User Responsibilities</h3>
      <h3>4. Payment and Billing</h3>
      <h3>5. Intellectual Property</h3>
      <h3>6. Limitation of Liability</h3>
      <h3>7. Term and Termination</h3>
      <h3>8. Governing Law</h3>
      <p>
        If you have questions about these Terms and Conditions, please contact us at legal@apexdigital.com.
      </p>
    </div>
  </Modal>
);

export default TermsConditions;