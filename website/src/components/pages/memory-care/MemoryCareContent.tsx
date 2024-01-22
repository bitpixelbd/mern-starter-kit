import React from "react";
import AssistedLivingSideBar from "@/components/pages/memory-care/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/memory-care/AssistedLivingSideContent";

export default function MemoryCareContent() {
  return (
      <div className="assisted-living-inner">
          <AssistedLivingSideBar />
          <AssistedLivingSideContent />
      </div>
  );
}
