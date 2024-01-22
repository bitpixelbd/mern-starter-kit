import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import Link from "next/link";
import AssistedDropdown from "@/components/common/header/component/AssistedDropdown";
import CommunityTypeContent from "@/components/common/pop-up/component/filter/CommunityTypeContent";
import PriceContent from "@/components/common/pop-up/component/filter/PriceContent";
import SizeContent from "@/components/common/pop-up/component/filter/SizeContent";
import AmenitiesContent from "@/components/common/pop-up/component/filter/AmenitiesContent";
import RoomAmenities from "@/components/common/pop-up/component/filter/RoomAmenities";
import MealsAndDining from "@/components/common/pop-up/component/filter/MealsAndDining";
import CommunityAmenities from "@/components/common/pop-up/component/filter/CommunityAmenities";
import { useRouter } from "next/router";

export default function MobileFilterContent({
    closeFilter,
    onChangeCheckbox,
    onClickClear,
    onChangeRadioButton,
    applyQueryParamToSearch
}: any) {
    const [isType, setIsType] = useState(false);
    const [isPrice, setIsPrice] = useState(false);
    const [isSize, setIsSize] = useState(false);
    const [isAmenitie, setIsAmenitie] = useState(false);
    const [isRoom, setIsRoom] = useState(false);
    const [isMeals, setIsMeals] = useState(false);
    const [isCommunity, setIsCommunity] = useState(false);
    const dropTypeMenu = (e) => {
        e.preventDefault();
        setIsType((drop) => !drop)
    }
    const dropPriceMenu = (e) => {
        e.preventDefault();
        setIsPrice((drop) => !drop)
    }
    const dropSizeMenu = (e) => {
        e.preventDefault();
        setIsSize((drop) => !drop)
    }
    const dropAmenitieMenu = (e) => {
        e.preventDefault();
        setIsAmenitie((drop) => !drop)
    }
    const dropRoomMenu = (e) => {
        e.preventDefault();
        setIsRoom((drop) => !drop)
    }
    const dropMealsMenu = (e) => {
        e.preventDefault();
        setIsMeals((drop) => !drop)
    }
    const dropCommunityMenu = (e) => {
        e.preventDefault();
        setIsCommunity((drop) => !drop)
    }

    const route = useRouter();
    const query: any = route.query;

    return (
        <div className="mobile-filter-wrapper">
            <div className="mobile-filter-header flex-justify-Div">
                <h3 className="headline-medium">Filters</h3>
                <button onClick={closeFilter}>
                    <SvgIcon name="close" className={''} />
                </button>
            </div>
            <div className="bottom-head-wrap mobile-filter-content-inner">
                <ul>
                    <li>
                        <Link href={''} className={isType ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropTypeMenu}>
                            Community types
                            <SvgIcon name={isType ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isType ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isType &&
                            <CommunityTypeContent
                                onChangeCheckbox={onChangeRadioButton}
                                queryParam={query}
                                queryString={"care_type"}
                            />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isPrice ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropPriceMenu}>
                            Prices
                            <SvgIcon name={isPrice ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isPrice ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isPrice &&
                            <PriceContent
                                onChangeRadioButton={onChangeRadioButton}
                                queryParam={query}
                                queryString={"price"}
                            />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isSize ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropSizeMenu}>
                            Community sizes
                            <SvgIcon name={isSize ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isSize ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isSize &&
                            <SizeContent
                                onChangeRadioButton={onChangeRadioButton}
                                queryParam={query}
                                queryString={"size"}
                            />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isAmenitie ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropAmenitieMenu}>
                            Senior Care Amenities
                            <SvgIcon name={isAmenitie ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isAmenitie ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isAmenitie &&
                            <RoomAmenities
                            onChangeCheckbox={onChangeCheckbox}
                            queryParam={query}
                            queryString={"amenity"}
                            amenityGroupName={'Senior Care Amenities'}
                             />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isRoom ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropRoomMenu}>
                            Room Amenities
                            <SvgIcon name={isRoom ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isRoom ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isRoom &&
                            <RoomAmenities
                                onChangeCheckbox={onChangeCheckbox}
                                queryParam={query}
                                queryString={"amenity"}
                                amenityGroupName={'Room Amenities'}
                                />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isMeals ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropMealsMenu}>
                            Meals and Dining
                            <SvgIcon name={isMeals ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isMeals ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isMeals &&
                            <MealsAndDining
                                onChangeCheckbox={onChangeCheckbox}
                                queryParam={query}
                                queryString={"amenity"}
                            />
                        }
                    </li>
                    <li>
                        <Link href={''} className={isCommunity ? "active flex-justify-Div" : "flex-justify-Div"} onClick={dropCommunityMenu}>
                            Community Amenities
                            <SvgIcon name={isCommunity ? "savron_up_primary" : "savron_down"} className={''} />
                            <SvgIcon name={isCommunity ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                        </Link>
                        {isCommunity &&
                            <CommunityAmenities
                                onChangeCheckbox={onChangeCheckbox}
                                queryParam={query}
                                queryString={"amenity"}
                            />
                        }
                    </li>
                </ul>
            </div>
            <div className="mobile-filter-footer flex-justify-Div">
                <button 
                className="primary-text-btn"
                onClick={() =>{ 
                    closeFilter();
                    onClickClear({});
                }}
                >
                    Clear All
                </button>
                <button 
                className="primary-short-btn"
                onClick={() => {
                    closeFilter();
                    applyQueryParamToSearch();
                }}
                 >
                    Apply
                </button>
            </div>
        </div>
    );
}
