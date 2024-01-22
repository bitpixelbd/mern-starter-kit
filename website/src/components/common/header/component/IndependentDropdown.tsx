import LogInInitialBtn from "@/components/common/LogInInitialBtn";
import TopSearchBar from "@/components/common/TopSearchBar";
import UserContent from "@/components/common/UserContent";
import SvgIcon from "@/components/SvgIcon";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import useGetCitiesForNavbar from "@/hooks/useGetCitiesForNavbar";
import { LIVING_OPTIONS_INDEPENDENT_LIVING } from "../../pop-up/component/quizz/quizOption";
import { CARE_TYPE_INDEPENDENT, PAGE_SEARCH_RESULT } from "@/config/constants";
import NavbarDropDownShimmer from "@/components/shimmer-effects/NavbarDropDownShimmer";
import { extractCityName } from "@/utils/utils";

export default function IndependentDropdown({ isEnabled }) {

    const { isLoading, citiesDataForNavbar } = useGetCitiesForNavbar(LIVING_OPTIONS_INDEPENDENT_LIVING, isEnabled);

    const cities = citiesDataForNavbar?.slice(0, 10)
    return (
        <>
            <div className="men-dropdown-wrapper">
                <div className="men-dropdown-wrapper-first">
                    <h3 className="title-large">Find Independent Living Near You</h3>
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
                                                href={`${PAGE_SEARCH_RESULT}?care_type=${CARE_TYPE_INDEPENDENT}&city=${city?.name}`}
                                                className="title-small"
                                            >
                                                { extractCityName(city?.name)} , {city?.code}
                                            </Link>)
                                    }

                                    )
                                }
                            </div>
                    }

                </div>
                <div className="men-dropdown-wrapper-last">
                    <h3 className="title-large">About Independent Living</h3>
                    <p className="body-regular">Independent Living Communities are specialized residential settings designed to provide seniors with a vibrant, social, and hassle-free living environment. These communities cater to older adults, generally aged 55 and over, who are able to manage their daily activities without the need for personal assistance. Independent Living offers a stress-free lifestyle by eliminating the demands of home maintenance, chores, and in some cases, meal preparation.</p>

                    <div className="flex-div read-more-assisted">
                        <Link className="primary-text-btn" href="/independent-living">
                            Read more about independent living
                        </Link>
                        <SvgIcon name="accordin_Icon_Right" className={''} />
                    </div>
                </div>
            </div>
        </>

    )
}
