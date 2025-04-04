import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import consentService from "../services/consentService";
import "../styles/MyConsent.css";

const MyConsent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userIdFromUrl = queryParams.get("userId");

  const [consentGiven, setConsentGiven] = useState("Yes");
  
  useEffect(() => {
    if (userIdFromUrl) {
      setUserId(userIdFromUrl);
    }
  }, [userIdFromUrl]);

  useEffect(() => {
    const fetchConsentDetails = async () => {
      if (userId) {
        try {

          // Add a delay of 3 seconds (3000 milliseconds)
          await new Promise(resolve => setTimeout(resolve, 3000));

          const consentDetails = await consentService.getAllConsentDetails(userId);
          console.log("Consent Details:", consentDetails);

          // Format userData from API response with default empty arrays for categories and subcategories
          const formattedData = {
            email: consentDetails.email[0]?.email || "Unknown Email",
            username: consentDetails.username[0]?.username || "Unknown Username",
            phoneNumber: consentDetails.phoneNumber[0]?.phone_number || "Not Specified",
            consentGiven: consentDetails.consentGiven[0]?.consent_given || "Not Specified", 
            templateName: consentDetails.templateName[0]?.template_name || "Default Template", 
            categories: consentDetails.categories || [], 
            subcategories: consentDetails.subcategories || [], 
            selectedCategories: consentDetails.selectedCategories || [], 
          };

          setUserData(formattedData); 
          setIsLoading(false); 
        } catch (error) {
          console.error("Error fetching consent details:", error);
          setIsLoading(false); 
        }
      }
    };

    fetchConsentDetails();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="myconsent-portal-loading-screen">
        <div className="myconsent-portal-spinner"></div>
        <p className="myconsent-portal-loading-text">Redirecting...</p>
      </div>
    );
  }

  if (!userData) {
    return <div>Error fetching data</div>;
  }

  // Check if email is a string before calling split
  const emailUsername = typeof userData.email === "string" ? userData.email.split("@")[0] : "Unknown";

  const isCategorySelected = (categoryId) => {
    return userData.selectedCategories.some(
      (selectedCategory) => selectedCategory.category_id === categoryId
    );
  };

  const toggleConsent = () => {
    const newConsent = consentGiven === "Yes" ? "No" : "Yes";
    setConsentGiven(newConsent);
  
    // If consent is rejected, turn off all category sliders
    if (newConsent === "No") {
      setUserData({ ...userData, selectedCategories: [] });
    }
  
    console.log("Updated Consent Given:", newConsent);
  };
  

  return (
    <div className="myconsent-portal-container">

      {/* Header */}
      <header className="myconsent-portal-header">
        <div className="myconsent-portal-header-content">
          <img src="https://www.consentmanager.net/en/wp-content/uploads/2020/12/RGB_Consentmanager-Bildmarke.jpg" alt="Logo" className="myconsent-portal-logo" />
          <div className="myconsent-portal-text">
            <h1 className="myconsent-portal-title">Consent Lifecycle Status</h1>
            <p className="myconsent-portal-subtitle">
              Track and manage your consent history, updates, and preferences. 
              Stay informed about how your data is being used and make changes as needed.
            </p>
          </div>
        </div>
      </header>


      {/* User Info */}
      <section className="myconsent-portal-user-info">
        <h2 className="myconsent-portal-section-title">🔍 Your Details</h2>
        <p className="myconsent-portal-info-item"><strong>User ID:</strong> {userId}</p>
        <p className="myconsent-portal-info-item"><strong>Username:</strong> {userData.username}</p>
        <p className="myconsent-portal-info-item"><strong>Email:</strong> {userData.email}</p>
        <p className="myconsent-portal-info-item"><strong>PhoneNumber:</strong> {userData.phoneNumber}</p>
      </section>


      {/* Consent History Table */}
      <section className="myconsent-portal-history">
        <h2 className="myconsent-portal-section-title">📜 Consent History</h2>
        <div className="myconsent-portal-table-container">
          <table className="myconsent-portal-history-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Overall Consent</th>
                {userData.categories.map(category => (
                  <th key={category.category_id}>{category.category_name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Just displaying the current consent state since that's what we have */}
              <tr>
                <td>1</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td className={`myconsent-portal-consent-status-${userData.consentGiven.toLowerCase()}`}>
                  {userData.consentGiven === "Yes" ? "✅" : "❌"}
                </td>
                {userData.categories.map(category => (
                  <td key={category.category_id}>
                    {isCategorySelected(category.category_id) ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>



      {/* Greeting */}
      <section className="myconsent-portal-greeting">
        <h2 className="myconsent-portal-greeting-text">Hello, {emailUsername}! 👋</h2>
      </section>

      {/* Overall Consent Status */}
      <section className={`myconsent-portal-status myconsent-portal-status-${userData.consentGiven.toLowerCase()}`}>
        <h2 className="myconsent-portal-status-title">📊 Overall Consent Status</h2>
        <p className="myconsent-portal-status-value">{userData.consentGiven == "Yes" ? "Accepted ✅" : "Rejected ❌"}</p>

        <label className="myconsent-portal-switch">
          <input 
            type="checkbox" 
            checked={consentGiven === "Yes"} 
            onChange={toggleConsent} 
          />
          <span className="myconsent-portal-slider round"></span>
        </label>

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

                <label className="myconsent-portal-switch">
                  <input 
                    type="checkbox" 
                    checked={isCategorySelected(category.category_id)} 
                    onChange={() => {
                      const updatedCategories = isCategorySelected(category.category_id)
                        ? userData.selectedCategories.filter((c) => c.category_id !== category.category_id)
                        : [...userData.selectedCategories, { category_id: category.category_id }];
                      setUserData({ ...userData, selectedCategories: updatedCategories });
                      console.log("Updated Selected Categories:", updatedCategories);
                    }} 
                  />
                  <span className="myconsent-portal-slider round"></span>
                </label>
                
              </div>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </div>
      </section>


      <button 
        className="myconsent-portal-save-btn" 
        onClick={async () => {
          try {
            const updatedData = {
              userId: userId,
              consentGiven: consentGiven === "Yes" ? 1 : 0,
              selectedCategories: consentGiven === "Yes" 
                ? userData.selectedCategories.map(cat => ({ category_id: cat.category_id })) 
                : [] // If consent is "No", remove all categories
            };

            console.log("Updated Consent Data:", JSON.stringify(updatedData, null, 2));

            const response = await consentService.updateUserConsent(updatedData);
            console.log("Consent Updated Successfully:", response);
            alert("Consent updated successfully!"); // Show success message
          } catch (error) {
            console.error("Error updating consent:", error);
            alert("Failed to update consent."); // Show error message
          }
        }}
      >
        Save
      </button>


    </div>
  );
};

export default MyConsent;
