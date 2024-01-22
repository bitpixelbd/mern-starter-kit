import React, { useState } from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import SvgIcon from "@/components/SvgIcon";
import TopSearchBar from "@/components/common/TopSearchBar";
import Image from "next/image";
import phone from "@/components/pages/home/assets/phone.svg";
import Rectangle23 from "@/components/pages/assisted-living/assets/Rectangle23.png";
import Rectangle34 from "@/components/pages/assisted-living/assets/Rectangle34.png";
import calculate from "@/components/assets/calculate.svg";
import CalculatePopup from "@/components/common/pop-up/calculate-popup";

export default function LivingCost() {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <div className="living-cost-inner">
                <h1 className="headline-medium">How much does assisted living cost?</h1>
                <h5 className="body-regular">Navigating through the financial landscape of <b>Assisted Living</b>, families often encounter a spectrum of costs influenced by various factors. The national average cost for Assisted Living in the United States has been approximately $4,000 to $5,000 per month. However, this figure can fluctuate notably depending upon several factors like location, room size, available amenities, and the level of care needed. For instance, Assisted Living costs in states like Alaska or Connecticut have historically been much higher than the national average, whereas facilities in states like Missouri or Louisiana tend to be more budget-friendly.</h5>
                <h5 className="body-regular">In recent years, there’s been a visible trend of gradual cost increment in Assisted Living, propelled by factors such as rising operational costs, enhancement in amenities, and an increased demand for services. Families exploring Assisted Living options should consider variables like additional fees for specialized services or higher levels of care, as these can notably impact the overall cost. It’s also prudent to explore various payment options, such as long-term care insurance, veterans’ benefits, or assisted living loans, to navigate through the financial aspects of transitioning to Assisted Living.</h5>
                <div className="start-searching-care">
                    <h2 className="headline-small">Calculate care homes pricing <br /> with our intelligent calculator</h2>
                    <button className="primary-short-btn" onClick={() => setShowModal(!showModal)}>
                        <SvgIcon name="calculator_white" className={''} />
                        Calculate Now
                    </button>
                </div>
                <h3 className="title-large">Financial Assistance for Assisted Living</h3>
                <h5 className="body-regular">Securing financial assistance for <b>Assisted Living</b> involves navigating through a multitude of available resources and strategically leveraging them to facilitate a seamless transition into a senior living community. Families may explore Medicaid, which, subject to eligibility, might cover certain assisted living services, or consider utilizing Life Insurance policies through options like cash surrender or life settlements. Long-Term Care Insurance often provides specified amounts towards assisted living costs if the policyholder requires help with Activities of Daily Living (ADLs). Veterans and their spouses may seek financial relief through VA Aid and Attendance Benefits, while Reverse Mortgages allow senior homeowners to transform home equity into usable funds. Each financial path comes with its unique set of stipulations, advantages, and considerations, let us help you figure out which is best for you.</h5>
                <ol>
                    <li><a href="#">Medicaid</a></li>
                    <li><a href="#">Life Insurance</a></li>
                    <li><a href="#">Long-Term Care Insurance</a></li>
                    <li><a href="#">VA Aid and Attendance Benefit</a></li>
                    <li><a href="#">Reverse Mortgages</a></li>
                </ol>
            </div>
            <CalculatePopup showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}
