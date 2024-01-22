import React, {useState} from "react";
import BonusCard from "@/components/pages/partner-profile/BonusCard";
import HowWorksCard from "@/components/pages/partner-profile/HowWorksCard";
import SvgIcon from "../../SvgIcon";


export default function Rewards() {
    return (
        <div className="rewards-wrapper">
            <h2 className="title-large">Bonus Rewards</h2>
            <div className="bonus-card-inner">
                {/*<BonusCard />*/}
                <div className="bonus-card-wrapper">
                    <SvgIcon name="Cash_Badge" className={'Cash_Badge_icon'}/>
                    <h4 className="title-small">Cash Bonuses</h4>
                    <p className="body-regular">For each person that you help, you will receive a cash bonus of $250.
                        The person you refer will also receive a cash bonus of $250 applied to their first month’s rent.</p>
                </div>
                <div className="bonus-card-wrapper">
                    <SvgIcon name="Star_Badge_primary" className={'Cash_Badge_icon'}/>
                    <h4 className="title-small">Star Referral Program</h4>
                    <p className="body-regular">In order to become a part of <b className="yellow-text">Star Referral Program</b> you need 10 referrals. You will receive a $1000 gift card of your choice for becoming a star referrer.</p>
                </div>
                <div className="bonus-card-wrapper">
                    <SvgIcon name="Elite_Badge_primary" className={'Cash_Badge_icon'}/>
                    <h4 className="title-small">Elite Referral Program</h4>
                    <p className="body-regular">In order to become a part of <b className="yellow-text">Elite Referral Program</b> you need 20 referrals. You will receive an additional $2500 gift card of your choice and for every referral from this point on you will receive a cash bonus of $500.</p>
                </div>
            </div>
            <h2 className="title-large">How does it work?</h2>
            <div className="how-it-works-inner">
                {/*<HowWorksCard />*/}
                <div className="how-works-wrapper">
                    <div className="how-works-number title-large">1</div>
                    <p className="body-regular">For each person that you help, you will receive a cash bonus of $250.
                        The person you refer will also receive a cash bonus of $250 applied to their first month’s rent.</p>
                </div>
                <div className="how-works-wrapper">
                    <div className="how-works-number title-large">2</div>
                    <p className="body-regular">When they use your link to find and secure a senior living option through Senior Places, we show our gratitude with cash bonuses for you and your referral!</p>
                </div>
                <div className="how-works-wrapper">
                    <div className="how-works-number title-large">3</div>
                    <p className="body-regular">We will help keep track of all your referrals here and send you the cash bonus once they finalize paperwork and move into their new home!</p>
                </div>
            </div>
        </div>
    );
}
