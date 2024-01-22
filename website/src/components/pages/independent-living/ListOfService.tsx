import React from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import AvailableContentItemSingle from "@/components/common/AvailableContentItemSingle";

export default function ListOfService() {

     const icons= [
    { name: "Hassle-Free Living", icon: "Hassle_Free_Living"},
    { name: "Maintenance Services", icon: "Maintenance_Services"},
    { name: "Dining Experiences", icon: "Dining_Experiences"},
    { name: "Transportation Services", icon: "Transportation_Services"},
    { name: "Safety & Accessibility", icon: "Safety_Accessibility"},
    { name: "Health and Wellness Programs", icon: "Health_And_Wellness_Programs"},
    { name: "Social and Recreational Opportunities", icon: "Social_And_Recreational_Opportunities"},
    { name: "Support as needed", icon: "Support_As_Needed"}
    ]

  return (
      <div className="list-of-services">
          <h2 className="body-large">Here are the list of services that care homes offer when someone needs assisted living:</h2>
          <div className="list-of-services-inner">

              {
                icons?.map(({name, icon})=><AvailableContentItemSingle key={name} name={name} icon={icon} />)
              }
          </div>
      </div>
  );
}
