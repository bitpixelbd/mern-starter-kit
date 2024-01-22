import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import QuizStep1 from "@/components/common/pop-up/component/quizz/QuizStep1";
import QuizStep2 from "@/components/common/pop-up/component/quizz/QuizStep2";
import QuizStep3 from "@/components/common/pop-up/component/quizz/QuizStep3";
import QuizStep4 from "@/components/common/pop-up/component/quizz/QuizStep4";
import QuizStep5 from "@/components/common/pop-up/component/quizz/QuizStep5";
import QuizStep6 from "@/components/common/pop-up/component/quizz/QuizStep6";
import QuizStep7 from "@/components/common/pop-up/component/quizz/QuizStep7";
import QuizStep8 from "@/components/common/pop-up/component/quizz/QuizStep8";
import QuizStep9 from "@/components/common/pop-up/component/quizz/QuizStep9";
import StepSubmitSucces from "@/components/common/pop-up/component/quizz/StepSubmitSucces";
import PopupFooter from "@/components/common/pop-up/component/PopupFooter";
import ProgressBarWrap from "@/components/common/pop-up/component/ProgressBarWrap";
import { QUIZES, FIRST_7_STEPS, STEP_1_CARE_RECEPIENT, STEP_8_LOCATION, STEP_9_CONTACT_INFO, STEP_10_OTP_VERIFICATION, STEP_2_LIVING_OPTIONS, LIVING_OPTIONS_ASSISTED_LIVING } from "@/components/common/pop-up/component/quizz/quizOption";
import OtpVerify from './component/OtpVerify';
import { PAGE_SEARCH_RESULT, ROLE_USER } from '@/config/constants';
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY, getQuizStepValueFromLS } from '@/utils/quiz';



export default function Quizz({ showModal, setShowModal, quizStep, setQuizStep, found }) {

    let quizProgress = found?.completed;

    const livingOption = getQuizStepValueFromLS(STEP_2_LIVING_OPTIONS, QUIZ_ANSWER_LOCAL_STORAGE_KEY);

    if (Array.isArray(livingOption) && livingOption.length) {

        if (livingOption[0] === LIVING_OPTIONS_ASSISTED_LIVING && found?.alternate_completed) {

            quizProgress = found?.alternate_completed
        }

    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                    localStorage.removeItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY);
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
                            <ProgressBarWrap progress={quizProgress} />
                            <div className="middle-content-main">

                                {
                                    FIRST_7_STEPS.includes(found?.step)
                                    &&
                                    <QuizStep1
                                        title={found?.title}
                                        step={found?.step}
                                        setStep={setQuizStep}
                                        quiz={found}
                                    />
                                }

                                {
                                    found?.step === STEP_8_LOCATION
                                    &&
                                    <QuizStep8
                                        step={found?.step}
                                        setStep={setQuizStep}
                                        quiz={found}
                                    />
                                }

                                {
                                    found?.step === STEP_9_CONTACT_INFO
                                    &&
                                    <QuizStep9
                                        step={found?.step}
                                        setStep={setQuizStep}
                                        quiz={found}
                                    />
                                }

                                {/* <QuizStep2  title={found?.title} step={found?.step} setStep={setQuizStep} /> */}
                                {/* <QuizStep3 /> */}
                                {/*<QuizStep4 />*/}
                                {/*<QuizStep5 />*/}
                                {/*<QuizStep6 />*/}
                                {/*<QuizStep7 />*/}
                                {/* <QuizStep8 /> */}
                                {/* <QuizStep9 /> */}

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
