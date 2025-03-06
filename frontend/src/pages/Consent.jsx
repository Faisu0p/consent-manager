import React, { useState } from "react";
import "../styles/Consent.css";
import CookieConsent from "../components/CookieConsent";
import CookieConsentPortal from "../components/CookieConsentPortal";

const Consent = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const openPortal = () => setIsPortalOpen(true);
  const closePortal = () => setIsPortalOpen(false);

  return (
    <div className="consent-container">
      {!isPortalOpen ? (
        <CookieConsent openPortal={openPortal} />
      ) : (
        <CookieConsentPortal onClose={closePortal} />
      )}
    </div>
  );
};

export default Consent;
