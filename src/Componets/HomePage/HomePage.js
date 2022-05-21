import React from "react";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import HomeBanner from "./HomeBanner/HomeBanner";
import Toolkits from "./Toolkits/Toolkits";

const HomePage = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <Toolkits></Toolkits>
      <BusinessSummary></BusinessSummary>
    </div>
  );
};

export default HomePage;
