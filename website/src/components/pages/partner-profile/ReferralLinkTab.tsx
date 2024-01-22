import SvgIcon from "@/components/SvgIcon";
import useUser from "@/hooks/userUser";
import Capa_1 from "@/components/assets/Capa_1.svg";

import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
} from 'next-share';
import Image from "next/image";
import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


export default function ReferralLinkTab() {
    const { user } = useUser();
    const referralUrl = user?.refer_link

    console.log("ref user", referralUrl);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Copied to clipboard
            </Popover.Body>
        </Popover>
    );

    const messengerOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        window.location.href =
            'fb-messenger://share?link=' +
            encodeURIComponent(referralUrl) +
            '&app_id=' +
            encodeURIComponent("")
    };

    return (
        <div className="referral-link-tab">
            <h2 className="title-large">Your Referral Link</h2>
            <div className="referral-link-inner">
                <div className="copy-link-Bar flex-div-single">
                    <input
                        className="body-small"
                        type="text"
                        placeholder="#link"
                        value={referralUrl}
                    />
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={popover}
                    >
                        <button
                            className="primary-short-btn flex-div-8gap"
                            onClick={() => navigator.clipboard.writeText(referralUrl)}
                        >
                            <SvgIcon name="copy_icon" className={''} />
                            Copy
                        </button>
                    </OverlayTrigger>

                </div>
                <div className="step-middle">
                    <h5 className="title-small">Or Share Via</h5>
                    <div>
                        <Image
                            className="Capa_1"
                            priority
                            src={Capa_1}
                            alt=""
                            onClick={messengerOnClick}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    <FacebookShareButton
                        url={referralUrl}>
                        <SvgIcon name="logos_facebook" className={'logos_facebook'} />
                    </FacebookShareButton>

                    <WhatsappShareButton
                        url={referralUrl}
                        // title={'next-share is a social share buttons for your next React apps.'}
                        separator=":: "
                    >
                        <SvgIcon name="logos_whatsapp" className={''} />
                    </WhatsappShareButton>

                    <EmailShareButton
                        url={referralUrl}
                        // subject={"ESPD - The world is our classroom "}
                        // body="Join ESPD today"
                        blankTarget={true}
                    >
                        <SvgIcon name="logos_google" className={''} />
                    </EmailShareButton>
                    {/* <a href="#"><SvgIcon name="logos_whatsapp" className={''} /></a>
                    <a href="#"><SvgIcon name="Capa_1" className={''} /></a>
                    <a href="#"><SvgIcon name="logos_facebook" className={'logos_facebook'} /></a>
                    <a href="#"><SvgIcon name="logos_google" className={''} /></a> */}
                </div>
            </div>
        </div>
    );
}
