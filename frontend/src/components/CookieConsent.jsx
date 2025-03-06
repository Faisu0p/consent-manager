import React from 'react';
import '../styles/CookieConsent.css';

const CookieConsent = () => {
  return (
    <div className="cookie-banner-container">
      <div className="cookie-banner-banner">
        <div className="cookie-banner-header">
          <h1 className="cookie-banner-company-name">COMPANY</h1>
          <h2 className="cookie-banner-title">Do you agree<br />to let us use cookies?</h2>
        </div>

        <div className="cookie-banner-content">
          <p className="cookie-banner-intro">
            We and <a href="#" className="cookie-banner-link-text">our 19 partners</a> use cookies and trackers to:
          </p>

          <div className="cookie-banner-purposes">
            <div className="cookie-banner-purpose-item">
              <div className="cookie-banner-checkbox-icon">✓</div>
              <div className="cookie-banner-purpose-text">Provide live support and access to our help center</div>
            </div>
            <div className="cookie-banner-purpose-item">
              <div className="cookie-banner-checkbox-icon">✓</div>
              <div className="cookie-banner-purpose-text">Generate insights to improve the interface</div>
            </div>
            <div className="cookie-banner-purpose-item">
              <div className="cookie-banner-checkbox-icon">✓</div>
              <div className="cookie-banner-purpose-text">Help you navigate and display important information</div>
            </div>
            <div className="cookie-banner-purpose-item">
              <div className="cookie-banner-checkbox-icon">✓</div>
              <div className="cookie-banner-purpose-text">Measure marketing effectiveness and offer updates</div>
            </div>
            <div className="cookie-banner-purpose-item">
              <div className="cookie-banner-checkbox-icon">✓</div>
              <div className="cookie-banner-purpose-text">Manage authentication and monitor errors</div>
            </div>
          </div>

          <p className="cookie-banner-details">
            Some cookies are needed for technical purposes, while others help with ads, insights, and more.
            Learn more in our <a href="#" className="cookie-banner-link-text">privacy center</a>.
          </p>

          <div className="cookie-banner-buttons">
            <button className="cookie-banner-configure-button">Configure</button>
            <button className="cookie-banner-disagree-button">I disagree</button>
            <button className="cookie-banner-agree-button">I agree</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
