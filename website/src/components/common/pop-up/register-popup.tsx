import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import RegisterContent from "@/components/common/pop-up/component/RegisterContent";
import SignInContent from "@/components/common/pop-up/component/SignInContent";
import LogInChoice from "@/components/common/pop-up/component/LogInChoice";
import OtpVerify from './component/OtpVerify';
import { FORM_FORGET_PASSWORD, FORM_LOGINCHOICE, FORM_OTP, FORM_SIGNIN, FORM_SIGNUP } from '@/config/constants';
import ForgetPassword from './component/ForgetPassword';

export default function RegisterPopup({
    showModal,
    setShowModal,
    loginRole,
    setLoginRole,
    currentForm,
    setCurrenForm
}) {

    // const [showLoginChoice, setShowLoginChoice] = useState(true);
    // const [showRegistration, setShowRegistration] = useState(false);
    // const [showOtpVerification, setShowOtpVerification] = useState(false);
    // const [showLogin, setShowLogin] = useState(false);
    // const [loginRole, setLoginRole] = useState(''); // 'user'/'partner'

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                    setCurrenForm(FORM_LOGINCHOICE)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="main-popup-wrapper small-width-popup">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="register-popup-wrap">
                            <div className="register-middle-content-main">
                                {
                                    (currentForm === FORM_LOGINCHOICE) &&
                                    <LogInChoice
                                        setLoginRole={(role) => {
                                            setCurrenForm(FORM_SIGNIN)
                                            setLoginRole(role)
                                        }}
                                    />
                                }

                                {
                                    (currentForm === FORM_SIGNIN) &&
                                    <SignInContent
                                        setCurrenForm={(formValue) => {
                                            setCurrenForm(formValue)
                                        }}
                                        loginRole={loginRole}
                                    />
                                }

                                {
                                    (currentForm === FORM_SIGNUP)
                                    &&
                                    <RegisterContent
                                        setCurrenForm={(formValue) => {
                                            setCurrenForm(formValue)
                                        }}
                                        loginRole={loginRole}
                                    />
                                }
                                {
                                    (currentForm === FORM_OTP) &&
                                    <OtpVerify
                                        loginRole={loginRole}
                                    />

                                }
                                {
                                    (currentForm === FORM_FORGET_PASSWORD) &&
                                    <ForgetPassword loginRole={loginRole} setCurrenForm={setCurrenForm} />
                                }
                                {/* <RegisterContent /> */}



                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}
