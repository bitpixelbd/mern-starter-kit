import SvgIcon from "@/components/SvgIcon";
import { formatNumberWithK } from "@/utils/formatPrice";
import React, { useState } from "react";
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from "@/components/common/pop-up/component/contact-expert/expertOptions";
import RequestTourPopup from "@/components/common/pop-up/request-tour";

export default function PriceRange({ singleCareHome }) {
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
    <>
      <div className="price-range-wrap">
        <p>Price ranges from</p>
        <h1>${startPrice} - ${endtPrice}</h1>
        <button className="primary-short-btn primary-full-btn" onClick={() => onClickExpert()}>Get Custom Pricing</button>
        <button 
        className="secondary-short-btn primary-full-btn" 
        onClick={() => setShowRequestTourModal(true)}>
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
    </>
  );
}
