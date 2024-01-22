import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import RequestTourStep1 from './component/request-tour/RequestTourStep1';

export const WRITE_REVIEW = 'review_write';
export const REVIEW_SUCCESS = 'review_success'

export default function RequestTourPopup({ showModal, setShowModal, careHomeId, careHomeName }) {

    const [currentView, setCurrentView] = useState(WRITE_REVIEW);

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
                <div className="main-popup-wrapper small-width-popup request-tour-pop-main">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="expert-popup-inner">
                            <div className="middle-content-main">
                                <RequestTourStep1
                                    careHomeId={careHomeId}
                                    careHomeName={careHomeName}
                                    setShowModal={setShowModal}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}
