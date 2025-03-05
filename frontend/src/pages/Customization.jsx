import React, { useState } from "react";
import "../styles/Customization.css";
import BannerTemplate from "../components/BannerTemplate/BannerTemplate";
import BannerPreview from "../components/BannerTemplate/BannerPreview";

const Customization = () => {

  const [bannerData, setBannerData] = useState({
    template: {
      name: "",
      mainText: "",
      infoParagraph: "",
      headerText: "",
      buttonAcceptText: "",
      buttonRejectText: "",
      buttonConfigureText: "",
    },
    portal: {
      template_id: "",
      upper_text: "",
      lower_text: "",
    },
    categories: [],
    subcategories: [],
    partners: []
  });

  const [activeTab, setActiveTab] = useState("templates");
  

  return (
    <div className="customization-container">
      <BannerTemplate bannerData={bannerData} setBannerData={setBannerData} activeTab={activeTab} setActiveTab={setActiveTab} />
      <BannerPreview bannerData={bannerData} activeTab={activeTab} />
    </div>
  );
};

export default Customization;
