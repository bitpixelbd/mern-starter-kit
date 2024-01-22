import React from "react";
import AvailableAmenitieItem from "@/components/pages/care-home-details/AvailableAmenitieItem";
import AvailableContentItemSingle from "@/components/common/AvailableContentItemSingle";
import AvailableAmenitieItemContent from "@/components/common/AvailableAmenitieItemContent";
import { ITEM_CAREHOME_DETAILS } from "@/config/constants";
export default function AvailableAmenities({ observerRefs, _ref, singleCareHome }: any) {
  return (
    <div
      className="available-amenities-wrapper"
      id="amenities-section"
      ref={_ref}
    >
      <h1 className="headline-large">Available Amenities</h1>
      <div className="available-amenities-wrap">
        <div className="accordion" id="accordionExample">
          {/*<ExploreSeniorItemSingle />*/}
          {
            singleCareHome?.data?.amenity?.map((amenity, index) => {
              return <AvailableAmenitieItem
                key={amenity?.group}
                index={index}
                groupName={amenity?.group}
                amenitiesArray={amenity?.items}
                page={ITEM_CAREHOME_DETAILS}
              />
            })
          }
        </div>
      </div>
    </div>
  );
}
