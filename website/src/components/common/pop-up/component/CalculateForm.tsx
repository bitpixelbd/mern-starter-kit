import SvgIcon from "@/components/SvgIcon";
import { get } from "@/services/api/api";
import { CALCULATOR_CARE_TYPE_ALL, CALCULATOR_CITY_ALL, CALCULATOR_ROOM_TYPE } from "@/services/api/endpoints";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Select from "react-select";

export default function CalculateForm({ setSelectedCity, selectedCity, setSelectedRoomType, selectedRoomType, setSelectedCareType, selectedCareType, handleMutation }) {

    const { isLoading: cityLoading, isError: cityIsError, error: cityError, data: calculatorCities, isSuccess: citiesSuccess } = useQuery({
        queryKey: ['calculatorCity'],
        queryFn: () => get(CALCULATOR_CITY_ALL)
    });

    const { isLoading: roomTypeIsLoading, isError: roomTypeIsError, error: roomTypeError, isSuccess: roomTypeSuccess, data: calculatorRoomTypes } = useQuery({
        queryKey: ['calculatorRoomType'],
        queryFn: () => get(CALCULATOR_ROOM_TYPE)
    });

    const { isLoading: careTypeIsLoading, isError: careTypeIsError, error: careTypeError, isSuccess: careTypeSuccess, data: calculatorCareTypes } = useQuery({
        queryKey: ['calculatorCareTypes'],
        queryFn: () => get(CALCULATOR_CARE_TYPE_ALL)
    });

    const roomTypeOptions = roomTypeSuccess && calculatorRoomTypes?.data?.map(item => {
        return ({
            value: item?.id, label: item?.name
        })
    })

    const careTypes = careTypeSuccess && calculatorCareTypes?.data?.map(item => {
        return ({
            value: item?.id, label: item?.name
        })
    })

    const cities = citiesSuccess && calculatorCities?.data?.map(item => {
        return ({
            value: item?.id, label: item?.name
        })
    })
    return (
        <>
            <div className="calculate-form">

                <div className="option-select-wrap">
                    <h2 className="option-title title-small">City Name</h2>
                    <div className="option-select-group">
                        <Select
                            options={cities}
                            classNamePrefix="option-select"
                            isSearchable
                            isClearable
                            placeholder="Select"
                            defaultValue={selectedCity}
                            onChange={setSelectedCity}
                        />
                    </div>
                </div>
                <div className="option-select-wrap">
                    <h2 className="option-title title-small">Type of Care</h2>
                    <div className="option-select-group">
                        <Select
                            options={careTypes}
                            classNamePrefix="option-select"
                            isSearchable
                            isClearable
                            placeholder="Select"
                            defaultValue={selectedCareType}
                            onChange={setSelectedCareType}
                        />
                    </div>
                </div>
                <div className="option-select-wrap">
                    <h2 className="option-title title-small">Type of Room</h2>
                    <div className="option-select-group">
                        <Select
                            options={roomTypeOptions}
                            classNamePrefix="option-select"
                            isSearchable
                            isClearable
                            placeholder="Select"
                            defaultValue={selectedRoomType}
                            onChange={setSelectedRoomType}
                        />
                    </div>
                </div>
                <button className="primary-short-btn" onClick={handleMutation}>Calculate</button>
            </div>
        </>
    )
}
