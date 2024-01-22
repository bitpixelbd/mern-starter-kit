import React, { useState } from "react";
import SvgIcon from "@/components/SvgIcon";
import AdvisorSendMessagePopup from "@/components/common/pop-up/advisor-message-pop-up";

export default function Advisor({ advisor }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="user-advisor-inner">
            {
                advisor?.profile_photo
                    ?
                    <img
                        className='advisor_avatar'
                        src={advisor?.profile_photo}
                        alt=""
                    />
                    :

                    <SvgIcon name="demo_avatar" className={'advisor_avatar'} />
            }

            <div className="advisor-details">
                <div className="advisor-details-head flex-justify-Div">
                    <div>
                        <h3 className="headline-small">{`${advisor?.first_name} ${advisor?.last_name}`}</h3>
                        <h5 className="label-large">{advisor?.designation === null ? "Senior Places Advisor" : advisor?.designation}</h5>
                    </div>
                    <button className="primary-short-btn" onClick={() => setShowModal(!showModal)}>
                        Send Message
                    </button>
                </div>
                <div className="advices-details-bottom flex-div-single">
                    <div>
                        <h6 className="label-small">Families Helped</h6>
                        <h4 className="title-small">{advisor?.families_helped}</h4>
                    </div>
                    <div>
                        <h6 className="label-small">Experience</h6>
                        <h4 className="title-small">{advisor?.experience} Years</h4>
                    </div>
                    <div>
                        <h6 className="label-small">Operating in</h6>
                        <h4 className="title-small">{advisor?.operating_in}</h4>
                    </div>
                </div>
            </div>
            <AdvisorSendMessagePopup
                advisor_id={advisor?.id}
                setShowModal={setShowModal}
                showModal={showModal}
                name={advisor?.first_name + " " + advisor?.last_name}
            />
        </div>
    );
}
