import React from "react";
import Modal from "../Modal";

type Props = {
  onClose: () => void;
};

const PrivacyPolicy: React.FC<Props> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <div className="prose max-w-none">
      <h2>Privacy Policy</h2>
      <p>Last Updated: April 1, 2026</p>
      <h3>1. Introduction</h3>
      <p>
        At Now Get Insured ("we," "our," or "us"), we respect your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how we collect, use, disclose,
        and safeguard your information when you use our services or visit our website.
      </p>
      <h3>2. Information We Collect</h3>
      <p>We may collect several types of information, including:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and other contact details you provide.</li>
        <li><strong>Usage Information:</strong> How you interact with our website and services.</li>
        <li><strong>Device Information:</strong> Web browser, IP address, and device type.</li>
      </ul>
      <h3>3. How We Use Your Information</h3>
      <h3>4. Sharing Your Information</h3>
      <h3>5. Data Security</h3>
      <h3>6. Your Rights and Choices</h3>
      <h3>7. Changes to This Policy</h3>
      <h3>8. Contact Us</h3>
      <p>
        If you have questions about this Privacy Policy, please contact us at info@nowgetinsured.com.
      </p>
    </div>
  </Modal>
);

export default PrivacyPolicy;