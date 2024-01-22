import SvgIcon from "@/components/SvgIcon";
import React from "react";
import Link from "next/link";
import { formatNumberWithK } from "@/utils/formatPrice";
import { PAGE_SEARCH, PAGE_SEARCH_RESULT } from "@/config/constants";

const SIZE_SMALL = "SMALL";
const SIZE_MEDIUM = "MEDIUM";
const SIZE_LARGE = "LARGE";

export default function CalculateData({ selectedSize, setSelectedSize, calculatedData }) {

    const startPrice = formatNumberWithK(calculatedData?.average_cost_start);
    const endPrice = formatNumberWithK(calculatedData?.average_cost_end);

    const handleSize = (value) => {
        setSelectedSize(value)
    }

    return (
        <>
            <div className="calculate-data">
                <p className="title-small">Estimated Average Cost</p>
                {/* <h1 className="display-medium">$5,000 <span className="headline-medium">/mo</span></h1> */}
                <h1 className="display-medium">${startPrice ? startPrice : 0} - ${endPrice ? endPrice : 0} <span className="headline-medium">/mo</span></h1>
                <h2 className="title-small">Community Size</h2>

                <div className="calculate-data-btn flex-justify-Div flex-div">
                    <button className={`tab-item-btn ${selectedSize === "SMALL" && 'tab-item-btn-active'}`} onClick={(e) => handleSize("SMALL")}>Small</button>
                    <button className={`tab-item-btn ${selectedSize === "MEDIUM" && 'tab-item-btn-active'}`} onClick={(e) => handleSize("MEDIUM")}>Medium</button>
                    <button className={`tab-item-btn ${selectedSize === "LARGE" && 'tab-item-btn-active'}`} onClick={(e) => handleSize("LARGE")}>Large</button>
                </div>
                {
                    selectedSize === SIZE_SMALL
                    &&
                    <h3 className="body-small"> <span className="title-small">Small -</span> Up to 20 residents. A home-like environment with shared common areas and family-style dining, equipped and staffed to support daily care.</h3>
                }
                {
                    selectedSize === SIZE_MEDIUM
                    &&
                    <h3 className="body-small"> <span className="title-small">Medium -</span> Between 20-50 residents. A boutique-like environment with communal areas and dining, services, activities, and amenities.</h3>
                }
                {
                    selectedSize === SIZE_LARGE
                    &&
                    <h3 className="body-small"> <span className="title-small">Large -</span> 50+ residents. A hotel-like environment with a dining room, concierge services, and wide range of activities and amenities.</h3>
                }

                <div className="flex-div mb-3">
                    <Link className="primary-text-btn" href={`${PAGE_SEARCH_RESULT}?size=${selectedSize.toLowerCase()}`}>
                        Browse {selectedSize.toLowerCase()} size communities
                    </Link>
                    <SvgIcon name="accordin_Icon_Right" className={''} />
                </div>
            </div>
        </>
    )
}
