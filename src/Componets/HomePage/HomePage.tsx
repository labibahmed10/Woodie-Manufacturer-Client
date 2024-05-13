import React from "react";
import BusinessSummary from "./BusinessSummary/BusinessSummary";
import Footer from "./Footer/Footer";
import GlobalCustomerPage from "./GlobalCustomerPage/GlobalCustomerPage";
import HomeBanner from "./HomeBanner/HomeBanner";
import ReviewSection from "./ReviewSection/ReviewSection";
import Toolkits from "./Toolkits/Toolkits";
import WhyChooseUsPage from "./WhyChooseUsPage/WhyChooseUsPage";

const HomePage = () => {
  return (
    <div>
      <HomeBanner></HomeBanner>
      <Toolkits></Toolkits>
      <BusinessSummary></BusinessSummary>
      <ReviewSection></ReviewSection>
      <GlobalCustomerPage></GlobalCustomerPage>
      <WhyChooseUsPage></WhyChooseUsPage>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
