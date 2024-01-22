import React from "react";
import BottomFooter from "./BottomFooter";
import MiddleFooter from "./MiddleFooter";
import SubscribeSection from "./SubscribeSection";
import TopFooter from "./TopFooter";

const Footer = () => {
  return (
    <>
      <SubscribeSection />
      <footer className="ps-footer">
        <div className="ps-container">
          <TopFooter />
          <MiddleFooter />
          <BottomFooter />
        </div>
      </footer>
    </>
  );
};

export default Footer;
