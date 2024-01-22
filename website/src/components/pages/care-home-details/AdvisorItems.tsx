import avatar from "@/components/common/assets/avatar.svg";
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from '@/components/common/pop-up/component/contact-expert/expertOptions';
import { QUIZES, STEP_1_CARE_RECEPIENT } from '@/components/common/pop-up/component/quizz/quizOption';
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import useGetSetting from '@/hooks/useGetSetting';
import Image from 'next/image';
import React, { useState } from 'react';
export default function AdvisorItems() {
  const [showExpertModal, setShowExpertModal] = useState(false);
  //Expert sates
  const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
  // per page expert-options based on step
  const expertOption = EXPERTS.find(expert => expert?.step === expertStep)

  const {isLoading, isError, error, settingsData} = useGetSetting()

  const onClickExpert = async () => {
    setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
    setShowExpertModal(true);
  }

  return (
    <>
      <div className="advisor-item-wrap">
        {/*<p>Tell me your needs, I’m here <br/> to assist you!</p>*/}
        {/*<Image*/}
        {/*    className="avater-icon"*/}
        {/*    src={avatar}*/}
        {/*    alt=""*/}
        {/*/>*/}
        {/*<h5>Maria Evans</h5>*/}
        {/*<h6>Senior Places Advisor</h6>*/}
        <h2 className="headline-small">Require Help?</h2>
        <p className="label-large"> Senior Places Support Specialists are Always Here to Assist You.</p>
        <button
          className="primary-short-btn primary-full-btn"
          onClick={() => onClickExpert()}>
          Send Message
        </button>
        <h4>Or call at <span><a className="check-available-number" href={`tel:${settingsData?.phone}`}><span>{settingsData?.phone}</span></a></span> to <br /> check availability</h4>
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
