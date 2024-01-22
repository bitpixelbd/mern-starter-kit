import AvailableContentItemSingle from "@/components/common/AvailableContentItemSingle";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import React from "react";

export default function ListOfService() {

    const icons= [
    { name: "24/7 Specialized Care", icon: "Hr_Supervision"},
    { name: "Nutrition and Dining", icon: "Nutrition_And_Dining"},
    { name: "Medication Management", icon: "Medication_Management"},
    { name: "Secure Environment", icon: "Secure_Environment"},
    { name: "Family Support and Education", icon: "Family_Support_And_Education"},
    { name: "Personal Care Assistance", icon: "Personal_Care_Assistance"},
    { name: "Mindful Activities", icon: "Dementia_Alzheimer"},
    { name: "Physical & Occupational Therapy", icon: "Physical_Occupational_Therapy"},
    { name: "Sensory Environments", icon: "Sensory_Environments"}
]

  return (
      <div className="list-of-services">
          <h2 className="body-large">Here are the list of services that care homes offer when someone needs assisted living:</h2>
          <div className="list-of-services-inner">
              {
                icons.map(({name, icon})=><AvailableContentItemSingle  key={name} name={name} icon={icon}/>)
              }
          </div>
      </div>
  );
}
