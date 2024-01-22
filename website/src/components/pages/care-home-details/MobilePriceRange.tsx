import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from '@/components/common/pop-up/component/contact-expert/expertOptions';
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import RequestTourPopup from "@/components/common/pop-up/request-tour";
import { formatNumberWithK } from '@/utils/formatPrice';
import { useState } from 'react';
export default function MobilePriceRange({ singleCareHome }) {

    const [showRequestTourModal, setShowRequestTourModal] = useState(false);
    const startPrice = formatNumberWithK(singleCareHome?.data?.price_start);
    const endtPrice = formatNumberWithK(singleCareHome?.data?.price_end);
    const [showExpertModal, setShowExpertModal] = useState(false);

    //Expert sates
    const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
    // per page expert-options based on step
    const expertOption = EXPERTS.find(expert => expert?.step === expertStep)

    const onClickExpert = async () => {
        setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
        setShowExpertModal(true);
    }

    return (
        <div className="mobile-price-range-wrap mobile-price-range-wrap-main">
            <div className="flex-justify-Div price-box-first">
                <div className="price-box-first-inner">
                    <p>Price ranges from</p>
                    <h2>${startPrice} - ${endtPrice}<span>/ mo</span></h2>
                </div>
                <button
                    className="primary-short-btn primary-full-btn"
                    onClick={() => onClickExpert()}>
                    Get Custom Pricing
                </button>
            </div>
            <div className="flex-justify-Div">
                <button
                    className="secondary-short-btn primary-full-btn"
                    onClick={() => onClickExpert()}>

                    Message Us
                </button>
                <button
                    className="secondary-short-btn primary-full-btn"
                    onClick={() => setShowRequestTourModal(true)}
                >
                    Request Tour
                </button>
            </div>
            <ConnectExpert
                showModal={showExpertModal}
                setShowModal={setShowExpertModal}
                expertStep={expertStep}
                setExpertStep={(value) => setExpertStep(value)}
                found={expertOption}
            />
            <RequestTourPopup
                showModal={showRequestTourModal}
                setShowModal={setShowRequestTourModal}
                careHomeId={singleCareHome?.data?.id}
                careHomeName={singleCareHome?.data?.name}
            />
        </div>
    );
}
