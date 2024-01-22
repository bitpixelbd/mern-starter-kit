import React, { useState } from 'react';
import Image from 'next/image';
import Rectangle14 from "@/components/pages/comparison-between/assets/Rectangle14.svg";
import SvgIcon from "@/components/SvgIcon";
import { formatNumberWithK } from '@/utils/formatPrice';
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from './pop-up/component/contact-expert/expertOptions';

export default function ProductItemSliderSingle({ name, address, state, street, postalCode, startPrice, endPrice }) {
    const [showExpertModal, setShowExpertModal] = useState(false);
    const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
    const formattedStartPrice = formatNumberWithK(startPrice);
    const formattedEndPrice = formatNumberWithK(endPrice);

    const expertOption = EXPERTS.find(expert => expert?.step === expertStep)
    const onClickExpert = async () => {
        setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
        setShowExpertModal(true);
    }

    console.log({name, address, state, street});
    return (
        <>
            <div className="product-item-slider-inner">
                {/*<Image className="product-item-slider-img" src={Rectangle14} alt="" />*/}
                <div className="product-item-slider-details">
                    <h2 className="headline-small">{name}</h2>
                    <div className="flex-div location-wrap locate-wrap-align-start">
                        <SvgIcon name="location_icon" className={''} />
                        {/* <p className="label-large">333 West 86th Street, New York, NY 10024</p> */}
                        <p className="label-large">{address} , {street} , {state} , {postalCode}</p>
                    </div>
                    <p className="label-large price-range-long-text">Price Ranges from <span className="">${formattedStartPrice} to ${formattedEndPrice}</span> based on the care types, services required, and things like that</p>
                    <button className="primary-short-btn primary-full-btn comparison-between-cus-btn" onClick={() => onClickExpert()}>
                        Get Custom Pricing
                    </button>
                </div>
            </div>
            <ConnectExpert
                showModal={showExpertModal}
                setShowModal={setShowExpertModal}
                expertStep={expertStep}
                setExpertStep={(value) => setExpertStep(value)}
                found={expertOption}
            />
        </>
    );
}

