import React, { useState } from "react";
import ReferralLinkTab from "@/components/pages/user-profile/ReferralLinkTab";
import TrackProgress from "@/components/pages/user-profile/TrackProgress";
import Rewards from "@/components/pages/user-profile/Rewards";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_UPDATE_USER_REFEREL_LIST } from "@/services/api/endpoints";


export default function UserReferral() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = ({ index }: { index: any }) => {
        setToggleState(index);
    }

    const { isLoading, isError, error, isSuccess, data: referList } = useQuery({
        queryKey: ["user profile refer list"],
        queryFn: () => get(API_UPDATE_USER_REFEREL_LIST)
    })

    return (
        <div className="user-referral-wrapper">
            <div className="pc-user-referral-wrap">
                <div className="user-referral-button-Wrap">
                    <button className={toggleState === 1 ? "tab-item-btn tab-item-btn-active" : "tab-item-btn"} onClick={() => toggleTab({ index: 1 })}>
                        Referral Link
                    </button>
                    <button className={toggleState === 2 ? "tab-item-btn tab-item-btn-active" : "tab-item-btn"} onClick={() => toggleTab({ index: 2 })}>
                        Track Progress
                    </button>
                    <button className={toggleState === 3 ? "tab-item-btn tab-item-btn-active" : "tab-item-btn"} onClick={() => toggleTab({ index: 3 })}>
                        Rewards
                    </button>
                </div>
            </div>
            <div className="mobile-user-referral-wrap">
                <div className="user-referral-button-Wrap">
                    <a className={toggleState === 1 ? "tab-item-btn-user-ref tab-item-btn-active" : "tab-item-btn-user-ref "} onClick={() => toggleTab({ index: 1 })}>
                        Referral Link
                    </a>
                    <a className={toggleState === 2 ? "tab-item-btn-user-ref tab-item-btn-active" : "tab-item-btn-user-ref "} onClick={() => toggleTab({ index: 2 })}>
                        Track Progress
                    </a>
                    <a className={toggleState === 3 ? "tab-item-btn-user-ref tab-item-btn-active" : "tab-item-btn-user-ref "} onClick={() => toggleTab({ index: 3 })}>
                        Rewards
                    </a>
                </div>
            </div>
            <div className="user-referral-content-wrap">
                <div className={toggleState === 1 ? "tab-Con active-Con" : "tab-Con"}>
                    <ReferralLinkTab />
                </div>
                <div className={toggleState === 2 ? "tab-Con active-Con" : "tab-Con"}>
                    <TrackProgress referList={referList?.data} />
                </div>
                <div className={toggleState === 3 ? "tab-Con active-Con" : "tab-Con"}>
                    <Rewards />
                </div>
            </div>
        </div>
    );
}
