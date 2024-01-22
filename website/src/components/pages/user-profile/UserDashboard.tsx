import React, { useState } from "react";
import HomeBase from "@/components/pages/user-profile/HomeBase";
import SavedCommunities from "@/components/pages/user-profile/SavedCommunities";
import UserReferral from "@/components/pages/user-profile/UserReferral";
import ProfileSetting from "@/components/pages/user-profile/ProfileSetting";
import SvgIcon from "@/components/SvgIcon";
import Home_inactive from "@/components/assets/Home_inactive.svg";
import { useRouter } from "next/router";
// import ProfileSetting from "@/components/common/ProfileSetting";

export default function UserDashboard() {
    const [toggleState, setToggleState] = useState('home_base');


    const router = useRouter()
    const { push, query } = router
    const { page } = query;


    const toggleTab = (activeTab) => {
        setToggleState(activeTab);
        router.push({
            pathname: router.pathname,
            query: { page: activeTab },
        }, undefined, { scroll: false });
    }

    return (
        <div className="user-content-main-wrapper">
            <div className="pc-button-wrap">
                <div className="button-Wrap">
                    <button className={(page === 'home_base' || page === undefined) ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('home_base')}>
                        <SvgIcon name={(page === 'home_base' || page === undefined) ? "Home_General" : "Home_inactive"} className={''} />
                        <SvgIcon name="Home_General" className={''} />
                        Home Base
                    </button>
                    <button className={page === 'saved_communities' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('saved_communities')}>
                        <SvgIcon name={page === 'saved_communities' ? "Heart_active" : "Heart_inactive"} className={''} />
                        <SvgIcon name="Heart_active" className={''} />
                        Saved Communities
                    </button>
                    <button className={page === 'referral' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('referral')}>
                        <SvgIcon name={page === 'referral' ? "Refaral_active" : "Refaral_inactive"} className={''} />
                        <SvgIcon name="Refaral_active" className={''} />
                        Your Referrals
                    </button>
                    <button className={page === 'profile' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('profile')}>
                        <SvgIcon name={page === 'profile' ? "Setting_active" : "Setting_inactive"} className={''} />
                        <SvgIcon name="Setting_active" className={''} />
                        Profile Settings
                    </button>
                </div>
            </div>
            <div className="mobile-button-Wrap">
                <div className="button-Wrap">
                    <button className={(page === 'home_base' || page === undefined) ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('home_base')}>
                        <SvgIcon name={(page === 'home_base' || page === undefined) ? "Home_General" : "Home_inactive"} className={''} />
                        <SvgIcon name="Home_General" className={''} />
                        Home Base
                    </button>
                    <button className={page === 'saved_communities' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('saved_communities')}>
                        <SvgIcon name={page === 'saved_communities' ? "Heart_active" : "Heart_inactive"} className={''} />
                        <SvgIcon name="Heart_active" className={''} />
                        Saved Communities
                    </button>
                    <button className={page === 'referral' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('referral')}>
                        <SvgIcon name={page === 'referral' ? "Refaral_active" : "Refaral_inactive"} className={''} />
                        <SvgIcon name="Refaral_active" className={''} />
                        Your Referrals
                    </button>
                    <button className={page === 'profile' ? "tab-Button active" : "tab-Button"} onClick={() => toggleTab('profile')}>
                        <SvgIcon name={page === 'profile' ? "Setting_active" : "Setting_inactive"} className={''} />
                        <SvgIcon name="Setting_active" className={''} />
                        Profile Settings
                    </button>
                </div>
            </div>
            <div className="tab-content-wrap">
                {(page === 'home_base' || page === undefined) && <HomeBase />}
                {page === 'saved_communities' && <SavedCommunities />}
                {page === 'referral' && <UserReferral />}
                {page === 'profile' && <ProfileSetting />}
                {/* <div className={toggleState === 'home_base' ? "tab-Con active-Con" : "tab-Con"}>
                    <HomeBase />
                </div>
                <div className={toggleState === 'saved_communities' ? "tab-Con active-Con" : "tab-Con"}>
                    <SavedCommunities />
                </div>
                <div className={toggleState === 'referral' ? "tab-Con active-Con" : "tab-Con"}>
                    <UserReferral />
                </div>
                <div className={page === 'profile' ? "tab-Con active-Con" : "tab-Con"}>
                    
                </div> */}
            </div>
        </div>
    );
}
