import React, { useState } from "react";
import TrackProgressTab from "@/components/pages/partner-profile/TrackProgressTab";
import Referrals from "@/components/pages/partner-profile/Referrals";

export default function TrackProgress({ referList }) {
  return (
    <div className="track-progress-wrapper">
      <h2 className="title-large">Your Progress</h2>
      <TrackProgressTab referList={referList} />
      <Referrals referList={referList} />
    </div>
  );
}
