import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import CalculateData from "@/components/common/pop-up/component/CalculateData";
import CalculateForm from "@/components/common/pop-up/component/CalculateForm";
import { useMutation } from 'react-query';
import { post } from '@/services/api/api';
import { API_POST_CALCULATOR_AVERAGE_COST } from '@/services/api/endpoints';

export default function CalculatePopup({ showModal, setShowModal }) {
    const [selectedCareType, setSelectedCareType] = useState(null);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSize, setSelectedSize] = useState("SMALL");
    const [calculatedData, setCalculatedData] = useState(null)

    const calculatewMutation = useMutation(
        async (data) => await post(API_POST_CALCULATOR_AVERAGE_COST, data?.data),
        {
            onSuccess: (res) => {
                setCalculatedData(res?.data)
            },
            onError: (err) => {
                console.log({ err })
            },
        }
    );

    const handleMutation = () => {
        const data: any = {}
        if (selectedRoomType) {
            data.type_of_room = selectedRoomType?.value
        }
        if (selectedCareType) {
            data.type_of_care = selectedCareType?.value
        }
        if (selectedCity) {
            data.city_id = selectedCity?.value
        }
        data.size = selectedSize

        //@ts-ignore
        calculatewMutation.mutate({
            data
        })
    }

    useEffect(() => {
        handleMutation()
    }, [selectedSize])

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
                <div className="main-popup-wrapper large-width-popup">
                    <Modal.Header closeButton>
                        <h1 className="headline-medium">Senior places calculator</h1>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="calculate-popup-inner">
                            <p className="body-regular calculate-popup-subtext">Calculate average pricing in your area based on your specific preferences</p>
                            <div className="calculate-content flex-div-single">
                                <CalculateForm handleMutation={handleMutation} setSelectedCity={setSelectedCity} selectedCity={selectedCity} setSelectedRoomType={setSelectedRoomType} selectedRoomType={selectedRoomType} setSelectedCareType={setSelectedCareType} selectedCareType={selectedCareType} />
                                <CalculateData selectedSize={selectedSize} setSelectedSize={setSelectedSize} calculatedData={calculatedData} />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}
