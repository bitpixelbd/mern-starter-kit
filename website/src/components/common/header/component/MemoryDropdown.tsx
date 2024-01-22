import LogInInitialBtn from "@/components/common/LogInInitialBtn";
import TopSearchBar from "@/components/common/TopSearchBar";
import UserContent from "@/components/common/UserContent";
import SvgIcon from "@/components/SvgIcon";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import useGetCitiesForNavbar from "@/hooks/useGetCitiesForNavbar";
import { LIVING_OPTIONS_MEMORY_CARE } from "../../pop-up/component/quizz/quizOption";
import { CARE_TYPE_MEMORY, PAGE_SEARCH_RESULT } from "@/config/constants";
import NavbarDropDownShimmer from "@/components/shimmer-effects/NavbarDropDownShimmer";
import { extractCityName } from "@/utils/utils";

export default function MemoryDropdown({ isEnabled }) {

    const {isLoading,citiesDataForNavbar } = useGetCitiesForNavbar(LIVING_OPTIONS_MEMORY_CARE, isEnabled);

    const cities = citiesDataForNavbar?.slice(0, 10)

    return (
        <>
            <div className="men-dropdown-wrapper">
                <div className="men-dropdown-wrapper-first">
                    <h3 className="title-large">Find Memory Care Near You</h3>
                    {
                        isLoading
                            ?
                            <NavbarDropDownShimmer />
                            :
                            <div className="near-item">
                                {
                                    cities &&
                                    cities.map(city => {
                                        return (
                                            <Link
                                                key={city?.id}
                                                href={`${PAGE_SEARCH_RESULT}?care_type=${CARE_TYPE_MEMORY}&city=${city?.name}`}
                                                className="title-small">
                                               {extractCityName(city?.name)} , {city?.code}
                                            </Link>)
                                    }
                                    )
                                }
                            </div>
                    }
                </div>
                <div className="men-dropdown-wrapper-last">
                    <h3 className="title-large">About Memory Care</h3>
                    <p className="body-regular">Memory Care is a specialized form of long-term care designed to meet the unique needs of individuals with Alzheimer's disease, dementia, or other memory impairments. This tender cocoon of a living environment is meticulously crafted to navigate through the delicate tendrils of memory challenges, offering a secure, supportive, and structured space where residents are enveloped in compassionate care and engaging activities.</p>

                    <div className="flex-div read-more-assisted">
                        <Link className="primary-text-btn" href="/memory-care">
                            Read more about memory care
                        </Link>
                        <SvgIcon name="accordin_Icon_Right" className={''} />
                    </div>
                </div>
            </div>
        </>
    )
}
