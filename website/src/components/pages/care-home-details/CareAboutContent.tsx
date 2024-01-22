import SaveShareBtn from "@/components/pages/care-home-details/SaveShareBtn";
import PriceRange from "@/components/pages/care-home-details/PriceRange";
import AdvisorItems from "@/components/pages/care-home-details/AdvisorItems";
import CareAboutText from "@/components/pages/care-home-details/CareAboutText";
import CareServices from "@/components/pages/care-home-details/CareServices";
import RoomTypes from "@/components/pages/care-home-details/RoomTypes";
import AvailableAmenities from "@/components/pages/care-home-details/AvailableAmenities";
import Neighbourhoods  from "@/components/pages/care-home-details/Neighbourhoods";
import Reviews  from "@/components/pages/care-home-details/Reviews";
import React from "react";

export default function CareAboutContent() {

  return (
      <div className="about-content-wrapper">
            <div className="care-about-content">
                <CareAboutText />
                <CareServices />
                <RoomTypes />
                <AvailableAmenities />
                <Neighbourhoods />
                <Reviews />

            </div>
            <div className="care-about-sidebar">
                <SaveShareBtn />
                <PriceRange />
                <AdvisorItems />
            </div>
      </div>
  );
}
