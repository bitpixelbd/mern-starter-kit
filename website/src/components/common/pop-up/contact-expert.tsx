import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import ContactExpertStep1 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep1";
import ContactExpertStep2 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep2";
import ContactExpertStep3 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep3";
import ContactExpertStep4 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep4";
import ContactExpertStep5 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep5";
import ContactExpertStep6 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep6";
import ContactExpertStep7 from "@/components/common/pop-up/component/contact-expert/ContactExpertStep7";
import StepSubmitSucces from "@/components/common/pop-up/component/contact-expert/StepSubmitSucces";
import PopupFooter from "@/components/common/pop-up/component/PopupFooter";
import ProgressBarWrap from "@/components/common/pop-up/component/ProgressBarWrap";
import { EXPERT_STEP_6_LOCATION, EXPERT_STEP_7_CONTACT_INFO, FIRST_5_STEPS_FOR_EXPERT } from './component/contact-expert/expertOptions';
import QuizStep6 from './component/quizz/QuizStep6';
import QuizStep8 from './component/quizz/QuizStep8';
import QuizStep9 from './component/quizz/QuizStep9';
import { EXPERT_ANSWER_LOCAL_STORAGE_KEY } from '@/utils/quiz';

export default function ContactExpert(
    {
        showModal,
        setShowModal,
        expertStep,
        setExpertStep,
        found

    }) {
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                    localStorage.removeItem(EXPERT_ANSWER_LOCAL_STORAGE_KEY);
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="main-popup-wrapper medium-width-popup">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="expert-popup-inner">
                            <ProgressBarWrap progress={found?.completed}/>
                            <div className="middle-content-main">
                                {
                                    FIRST_5_STEPS_FOR_EXPERT.includes(found?.step)
                                    &&

                                    <ContactExpertStep1
                                        title={found?.title}
                                        step={found?.step}
                                        setStep={setExpertStep}
                                        expert={found}
                                    />
                                }

                                {
                                     found.step === EXPERT_STEP_6_LOCATION
                                      &&
  
                                      <ContactExpertStep6
                                      step={found?.step}
                                      setStep={setExpertStep}
                                      expert={found}
                                      />
                                }
                                {
                                     found.step === EXPERT_STEP_7_CONTACT_INFO
                                      &&
  
                                      <ContactExpertStep7
                                          step={found?.step}
                                          setStep={setExpertStep}
                                          expert={found}
                                      />
                                }

                                {/*<QuizStep2 />*/}
                                {/*<QuizStep3 />*/}
                                {/*<QuizStep4 />*/}
                                {/*<QuizStep5 />*/}
                                {/*<QuizStep6 />*/}
                                {/*<QuizStep7 />*/}
                            </div>
                            {/*<StepSubmitSucces />*/}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <PopupFooter />
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}
