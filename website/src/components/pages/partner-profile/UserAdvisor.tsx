import React, {useState} from "react";
import SvgIcon from "@/components/SvgIcon";
import Advisor from "@/components/pages/partner-profile/Advisor";

export default function UserAdvisor({advisor}) {
    return (
        <div className="user-advisor-wrapper">
            <h2 className="headline-large">Your Senior Places Advisor</h2>
            <Advisor advisor={advisor} />
        </div>
  );
}
