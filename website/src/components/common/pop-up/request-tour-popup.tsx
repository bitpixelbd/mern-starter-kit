import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import RequestTourContent from "@/components/common/pop-up/component/RequestTourContent";

export default function RequestTourPopup({
    showModal,
    setShowModal
}) {


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
                        <div className="register-popup-wrap">
                            <div className="register-middle-content-main">
                                <RequestTourContent />
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
