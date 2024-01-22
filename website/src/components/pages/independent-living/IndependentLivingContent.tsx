import React from "react";
import AssistedLivingSideBar from "@/components/pages/independent-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/independent-living/AssistedLivingSideContent";

export default function IndependentLivingContent() {
  return (
      <div className="assisted-living-inner">
          <AssistedLivingSideBar />
          <AssistedLivingSideContent />
      </div>
  );
}
