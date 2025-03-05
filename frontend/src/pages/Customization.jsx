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
      name: "",
      url: "",
      description: "",
    },
    categories: [],
    subcategories: [],
    partners: []
  });
  

  return (
    <div className="customization-container">
      <BannerTemplate bannerData={bannerData} setBannerData={setBannerData} />
      <BannerPreview bannerData={bannerData} />
    </div>
  );
};

export default Customization;
