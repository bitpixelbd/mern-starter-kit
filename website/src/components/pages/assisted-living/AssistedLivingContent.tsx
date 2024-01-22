import React from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";

export default function AssistedLivingContent() {
  return (
      <div className="assisted-living-inner">
          <AssistedLivingSideBar />
          <AssistedLivingSideContent />
      </div>
  );
}
