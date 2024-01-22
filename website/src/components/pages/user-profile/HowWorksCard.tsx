import React, {useState} from "react";
import TrackProgressTab from "@/components/pages/user-profile/TrackProgressTab";
import Referrals from "@/components/pages/user-profile/Referrals";
import SvgIcon from "@/components/SvgIcon";

export default function HowWorksCard() {
    return (
      <div className="how-works-wrapper">
          <div className="how-works-number title-large">1</div>
          <p className="body-regular">For each person that you help, you will receive a cash bonus of $250.
              The person you refer will also receive a cash bonus of $250 applied to their first month’s rent.</p>
      </div>
  );
}
