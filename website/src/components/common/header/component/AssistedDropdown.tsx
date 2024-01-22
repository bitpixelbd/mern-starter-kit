import LogInInitialBtn from "@/components/common/LogInInitialBtn";
import TopSearchBar from "@/components/common/TopSearchBar";
import UserContent from "@/components/common/UserContent";
import SvgIcon from "@/components/SvgIcon";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import { LIVING_OPTIONS_ASSISTED_LIVING } from "../../pop-up/component/quizz/quizOption";
import useGetCitiesForNavbar from "@/hooks/useGetCitiesForNavbar";
import { CARE_TYPE_ASSISTED, PAGE_SEARCH_RESULT } from "@/config/constants";
import NavbarDropDownShimmer from "@/components/shimmer-effects/NavbarDropDownShimmer";
import { extractCityName } from "@/utils/utils";

export default function AssistedDropdown({ isEnabled }) {

    const { isLoading, citiesDataForNavbar } = useGetCitiesForNavbar(LIVING_OPTIONS_ASSISTED_LIVING, isEnabled);

    const cities = citiesDataForNavbar?.slice(0, 10)

    return (
        <>
            <div className="men-dropdown-wrapper">
                <div className="men-dropdown-wrapper-first">
                    <h3 className="title-large">Find Assisted Living Near You</h3>
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
                                                href={`${PAGE_SEARCH_RESULT}?care_type=${CARE_TYPE_ASSISTED}&city=${city?.name}`}
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
                    <h3 className="title-large">About Assisted Living</h3>
                    <p className="body-regular">Navigating through the vast spectrum of senior living options, Assisted Living facilities stand out as a pivotal choice for families and seniors who are seeking a balanced blend of independence and assistance. </p>

                    <div className="flex-div read-more-assisted">
                        <Link className="primary-text-btn" href="/assisted-living">
                            Read more about assisted living
                        </Link>
                        <SvgIcon name="accordin_Icon_Right" className={''} />
                    </div>
                </div>
            </div>
        </>
    )
}
