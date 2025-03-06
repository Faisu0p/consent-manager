import React from "react";
import "../styles/Consent.css";
import CookieConsent from "../components/CookieConsent";
import CookieConsentPortal from "../components/CookieConsentPortal";

const Consent = () => {
  return (
    <div className="consent-container">
      <CookieConsent />
      <CookieConsentPortal />
    </div>
  );
};

export default Consent;
