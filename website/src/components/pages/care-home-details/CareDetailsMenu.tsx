import React, { useRef, useState } from "react";
import CareAboutText from "@/components/pages/care-home-details/CareAboutText";
import CareServices from "@/components/pages/care-home-details/CareServices";
import RoomTypes from "@/components/pages/care-home-details/RoomTypes";
import AvailableAmenities from "@/components/pages/care-home-details/AvailableAmenities";
import Neighbourhoods from "@/components/pages/care-home-details/Neighbourhoods";
import Reviews from "@/components/pages/care-home-details/Reviews";
import SaveShareBtn from "@/components/pages/care-home-details/SaveShareBtn";
import PriceRange from "@/components/pages/care-home-details/PriceRange";
import AdvisorItems from "@/components/pages/care-home-details/AdvisorItems";
import CareMenuTabBtn from "@/components/pages/care-home-details/CareMenuTabBtn";
import MobilePriceRange from "@/components/pages/care-home-details/MobilePriceRange";

export default function CareDetailsMenu({
  observerRefs,
  activeSection,
  navHeader,
  refs,
  activeIndex,
  singleCareHome,
}: any) {
  return (
    <div className="care-menu-wrapper">
      <div className="tab-main-wrap">
        <CareMenuTabBtn
          activeSection={activeSection}
          navHeader={navHeader}
          activeIndex={activeIndex}
        />
        <div className="about-content-wrapper">
          <div className="care-about-content">
            <CareAboutText
              observerRefs={observerRefs}
              _ref={refs?.aboutRef}
              singleCareHome={singleCareHome}
            />
            <CareServices
              observerRefs={observerRefs}
              _ref={refs?.careRef}
              singleCareHome={singleCareHome}
            />
            <RoomTypes
              observerRefs={observerRefs}
              _ref={refs?.roomRef}
              singleCareHome={singleCareHome}
            />
            <AvailableAmenities
              observerRefs={observerRefs}
              _ref={refs?.amenityRef}
              singleCareHome={singleCareHome}
            />
            <Neighbourhoods
              observerRefs={observerRefs}
              _ref={refs?.neighbourRef}
              singleCareHome={singleCareHome}
            />
            <Reviews
              observerRefs={observerRefs}
              _ref={refs?.reviewRef}
              singleCareHome={singleCareHome}
            />
          </div>
          <div className="care-about-sidebar">
            <div className="sticky-wrap-care-sidebar-right">
              <SaveShareBtn  singleCareHome={singleCareHome}/>
              <PriceRange singleCareHome={singleCareHome} />
              <AdvisorItems />
            </div>
          </div>
        </div>
      </div>
      <MobilePriceRange singleCareHome={singleCareHome} />
    </div>
  );
}
