import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import SharePopupContent from "@/components/common/pop-up/component/share/SharePopupContent";
import Link from 'next/link';
import { PAGE_COMPARISON } from '@/config/constants';
import SvgIcon from '@/components/SvgIcon';

export default function ComparisonPopup({ showModal, setShowModal, errorMessage }) {
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="main-popup-wrapper small-width-popup">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="expert-popup-inner">
                            <div className="middle-content-main">
                                <div className="step-wrapper">
                                    <div className="compearer-popup-inner">
                                        <p>{errorMessage === '' ?  'You have added this care home for comparison!' : errorMessage }</p>
                                        <br />

                                        <Link href={PAGE_COMPARISON} >
                                            <button
                                                className="primary-short-btn flex-div-8gap"

                                            >
                                                <SvgIcon name="copy_icon" className={''} />
                                                Continue to comparison page
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                {/* <SharePopupContent currentUrl={currentUrl} /> */}
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
