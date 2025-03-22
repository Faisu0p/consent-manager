import React, { useState, useEffect } from "react";
import "../styles/MyConsent.css"; // Styling for the full-page layout

const MyConsent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short delay before displaying the content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Static User & Consent Data
  const userData = {
    userId: "12345",
    email: "user@example.com",
    overallConsent: "Accepted",
    categories: [
      {
        id: 1,
        name: "Marketing",
        accepted: true,
        timestamp: "2025-03-20 14:30",
        subcategories: [
          { id: 101, name: "Email Promotions", description: "Receive marketing emails" },
          { id: 102, name: "Ad Personalization", description: "Personalized ads based on behavior" },
        ],
      },
      {
        id: 2,
        name: "Analytics",
        accepted: false,
        timestamp: "2025-03-20 14:30",
        subcategories: [
          { id: 201, name: "Website Analytics", description: "Track site usage for improvements" },
        ],
      },
    ],
  };

  return (
    <div className="myconsent-portal-container">
      {isLoading ? (
        <div className="myconsent-portal-loading-screen">
          <div className="myconsent-portal-spinner"></div>
          <p className="myconsent-portal-loading-text">Redirecting...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="myconsent-portal-header">
            <h1 className="myconsent-portal-title">MyConsent Portal</h1>
            <p className="myconsent-portal-subtitle">Review and manage your consent preferences.</p>
          </header>

          {/* User Info */}
          <section className="myconsent-portal-user-info">
            <h2 className="myconsent-portal-section-title">👤 User Information</h2>
            <p className="myconsent-portal-info-item"><strong>User ID:</strong> {userData.userId}</p>
            <p className="myconsent-portal-info-item"><strong>Email:</strong> {userData.email}</p>
          </section>

          {/* Greeting */}
          <section className="myconsent-portal-greeting">
            <h2 className="myconsent-portal-greeting-text">Hello, {userData.email.split("@")[0]}! 👋</h2>
          </section>

          {/* Overall Consent Status */}
          <section className={`myconsent-portal-status myconsent-portal-status-${userData.overallConsent.toLowerCase()}`}>
            <h2 className="myconsent-portal-status-title">📊 Overall Consent Status</h2>
            <p className="myconsent-portal-status-value">{userData.overallConsent}</p>
          </section>

          {/* Consent Categories */}
          <section className="myconsent-portal-categories">
            <h2 className="myconsent-portal-categories-title">Your Consent Preferences</h2>
            <div className="myconsent-portal-category-grid">
              {userData.categories.map((category) => (
                <div key={category.id} className="myconsent-portal-category-card">
                  <h3 className="myconsent-portal-category-name">{category.name}</h3>
                  <p className="myconsent-portal-category-status">
                    <strong>Accepted:</strong> {category.accepted ? "✅ Yes" : "❌ No"}
                  </p>
                  <p className="myconsent-portal-category-timestamp">
                    <strong>Last Updated:</strong> {category.timestamp}
                  </p>

                  <ul className="myconsent-portal-subcategory-list">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id} className="myconsent-portal-subcategory-item">
                        <strong>{sub.name}</strong> - {sub.description}
                      </li>
                    ))}
                  </ul>

                  <button className="myconsent-portal-modify-btn">Modify Consent</button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyConsent;
