import React from "react";
import "../styles/Consent.css";
import CookieConsent from "../components/CookieConsent";
import CookieConsentPortal from "../components/CookieConsentPortal";

const Consent = () => {
  return (
    <div className="consent-container">
      <h1>.................................................Welcome to Consent Management...............................................</h1>
      <CookieConsent />
      <CookieConsentPortal />
    </div>
  );
};

export default Consent;
