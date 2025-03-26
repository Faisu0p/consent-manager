import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import consentService from "../services/consentService"; // Default import
import "../styles/MyConsent.css"; // Styling for the full-page layout

const MyConsent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null); // State for storing API response data
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromUrl = queryParams.get("userId");
  
  useEffect(() => {
    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
    }
  }, [userIdFromUrl]);

  useEffect(() => {
    const fetchConsentDetails = async () => {
      if (userId) {
        try {
          const consentDetails = await consentService.getAllConsentDetails(userId); // Using the method from consentService
          console.log("Consent Details:", consentDetails); // Logging the API response

          // Format userData from API response with default empty arrays for categories and subcategories
          const formattedData = {
            email: consentDetails.email[0]?.email || "Unknown Email", // Assume the first email
            consentGiven: consentDetails.consentGiven[0]?.consent_given || "Not Specified", // Assume the first consent
            templateName: consentDetails.templateName[0]?.template_name || "Default Template", // Assume the first template
            categories: consentDetails.categories || [], // Default empty array if undefined
            subcategories: consentDetails.subcategories || [], // Default empty array if undefined
            selectedCategories: consentDetails.selectedCategories || [], // Default empty array for selected categories
          };

          setUserData(formattedData); // Store the formatted data in state
          setIsLoading(false); // Set loading to false when data is fetched
        } catch (error) {
          console.error("Error fetching consent details:", error);
          setIsLoading(false); // Set loading to false in case of error
        }
      }
    };

    fetchConsentDetails();
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!userData) {
    return <div>Error fetching data</div>; // Error state
  }

  // Check if email is a string before calling split
  const emailUsername = typeof userData.email === "string" ? userData.email.split("@")[0] : "Unknown";

  const isCategorySelected = (categoryId) => {
    return userData.selectedCategories.some(
      (selectedCategory) => selectedCategory.category_id === categoryId
    );
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
            <p className="myconsent-portal-info-item"><strong>User ID:</strong> {userId}</p>
            <p className="myconsent-portal-info-item"><strong>Email:</strong> {userData.email}</p>
          </section>

          {/* Greeting */}
          <section className="myconsent-portal-greeting">
            <h2 className="myconsent-portal-greeting-text">Hello, {emailUsername}! 👋</h2>
          </section>

          {/* Overall Consent Status */}
          <section className={`myconsent-portal-status myconsent-portal-status-${userData.consentGiven.toLowerCase()}`}>
            <h2 className="myconsent-portal-status-title">📊 Overall Consent Status</h2>
            <p className="myconsent-portal-status-value">{userData.consentGiven == "Yes" ? "Accepted ✅" : "Rejected ❌"}</p>
          </section>

          {/* Consent Categories */}
          <section className="myconsent-portal-categories">
            <h2 className="myconsent-portal-categories-title">Your Consent Preferences</h2>
            <div className="myconsent-portal-category-grid">
              {userData.categories.length > 0 ? (
                userData.categories.map((category) => (
                  <div key={category.category_id} className="myconsent-portal-category-card">
                    <h3 className="myconsent-portal-category-name">{category.category_name}</h3>
                    <p className="myconsent-portal-category-status">
                      <strong>Required:</strong> {category.is_required ? "✅ Yes" : "❌ No"}
                    </p>

                    <p className="myconsent-portal-category-acceptance">
  <strong>Acceptance Status:</strong> {isCategorySelected(category.category_id) ? "Accepted ✅" : "Rejected ❌"}
</p>
                    <p className="myconsent-portal-category-description">
                      <strong>Description:</strong> {category.category_description}
                    </p>

                    <ul className="myconsent-portal-subcategory-list">
                      {userData.subcategories
                        .filter((sub) => sub.category_id === category.category_id)
                        .map((sub) => (
                          <li key={sub.subcategory_id} className="myconsent-portal-subcategory-item">
                            <strong>{sub.subcategory_name}</strong> - {sub.subcategory_description}
                          </li>
                        ))}
                    </ul>

                    <button className="myconsent-portal-modify-btn">Modify Consent</button>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyConsent;
