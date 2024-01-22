import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import RequestTourContent from "@/components/common/pop-up/component/RequestTourContent";
import SvgIcon from '@/components/SvgIcon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { showToast } from '@/utils/toastUtils';
import { post } from '@/services/api/api';
import { API_PARTNER_SEND_MESSAGE_ADVISOR, API_POST_REQUEST_TOUR, API_USER_SEND_MESSAGE_ADVISOR } from '@/services/api/endpoints';
import { boolean, object, string } from "yup";
import Input from '@/components/forms/Input';
import useUser from '@/hooks/userUser';

export default function AdvisorSendMessagePopup({
    showModal,
    setShowModal,
    advisor_id,
    name
}) {

    const loggedUser = useUser()
    const advisorSendMessageEndPoint = loggedUser?.user?.role === "user" ? API_USER_SEND_MESSAGE_ADVISOR : API_PARTNER_SEND_MESSAGE_ADVISOR
    let userSchema = object({
        message: string().required("Message is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(userSchema) });

    const requestTourMutation = useMutation(
        async (data) => await post(advisorSendMessageEndPoint, data),
        {
            onSuccess: (res) => {
                showToast("success", "Tour Request Send Successfully")
                setShowModal(false)
            },
            onError: (err) => {
                showToast("error", "Failed, Please try again")
            },
        }
    );

    const onFormSubmit = (data: any) => {
        const payload = {
            advisor_id: advisor_id,
            message: data?.message,
        }

        requestTourMutation.mutate(payload);
    };

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
                            <div className="advisor-content-area" >
                                <div className="step-wrapper" style={{ padding: "24px 0px" }}>
                                    <h1 className="headline-small">Send message at senior places advisor <br />{name}</h1>
                                    <div className="step-middle">
                                        <form noValidate>
                                            <Input
                                                register={register}
                                                errors={errors}
                                                isRequired={true}
                                                name="message"
                                                type="text"
                                                label="Message*"
                                                placeholder='Write your message'
                                                isTextArea={true}
                                                row={5}
                                            />

                                        </form>
                                    </div>
                                    <div className="step-btn flex-div-12gap">
                                        <button
                                            className="primary-short-btn primary-full-btn request-tour-btn"
                                            onClick={handleSubmit(onFormSubmit)}
                                            disabled={requestTourMutation.isLoading}
                                        >{requestTourMutation.isLoading ? "Please wait ..." : "Send your message"}<SvgIcon name="white_arrow_right" className={''} /></button>
                                    </div>
                                </div>
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
