import React from "react";
import Modal from "../Modal";

type Props = {
  onClose: () => void;
};

const CookiePolicy: React.FC<Props> = ({ onClose }) => (
  <Modal onClose={onClose}>
    <div className="prose max-w-none">
      <h2>Cookie Policy</h2>
      <p>Last Updated: March 16, 2026</p>
      <h3>1. What are Cookies?</h3>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website.
        They are widely used to make websites work more efficiently and provide information to the website owners.
      </p>
      <h3>2. How We Use Cookies</h3>
      <ul>
        <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly.</li>
        <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website.</li>
        <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make.</li>
        <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website and the pages you have visited.</li>
      </ul>
      <h3>3. Managing Cookies</h3>
      <h3>4. Third-Party Cookies</h3>
      <h3>5. Changes to This Policy</h3>
      <p>
        If you have questions about our Cookie Policy, please contact us at privacy@growxmarketing.com.
      </p>
    </div>
  </Modal>
);

export default CookiePolicy;