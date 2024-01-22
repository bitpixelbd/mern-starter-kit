import AvailableContentItemSingle from "@/components/common/AvailableContentItemSingle";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import React from "react";

export default function ListOfService() {

    const AssistedIcons= [
    { name: "Medication Management", icon: "Medication_Management"},
    { name: "Housekeeping", icon: "Housekeeping"},
    { name: "Bathing Assistance", icon: "Bathing_Assistance"},
    { name: "24 Hr Supervision", icon: "Hr_Supervision"},
    { name: "Laundry Service", icon: "Laundry_Service"},
    { name: "ADL Assistance", icon: "ADL_Assistance"},
    { name: "Meals Provided", icon: "Meals_Provided"},
    { name: "Incontinence care", icon: "Incontinence_care"},
    { name: "Ambulation Assistance", icon: "Ambulation_Assistance"},
    { name: "Dementia/Alzheimer’s", icon: "Dementia_Alzheimer"},
    { name: "Diabetes Care", icon: "Diabetes_Care"},
]

  return (
      <div className="list-of-services">
          <h2 className="body-large">Here are the list of services that care homes offer when someone needs assisted living:</h2>
          <div className="list-of-services-inner">
            {
                AssistedIcons?.map(({name, icon})=><AvailableContentItemSingle key={name} name={name} icon={icon} />)
            }
          </div>
      </div>
  );
}
