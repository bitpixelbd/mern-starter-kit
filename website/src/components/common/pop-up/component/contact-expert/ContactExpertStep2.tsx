import SvgIcon from "@/components/SvgIcon";
import React from "react";
import Link from "next/link";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";


export default function ContactExpertStep2() {
    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Do you know what senior living option would be best for your loved one?</h1>
                <div className="step-middle">
                    <RedioCheckBtn />
                    <RedioCheckBtn />
                    <RedioCheckBtn />
                </div>
                <div className="step-btn flex-div-12gap">
                    <button className="secondary-short-btn flex-div-8gap"><SvgIcon name="primary_arrow_left" className={''}/>Back</button>
                    <button className="primary-short-btn">Continue<SvgIcon name="white_arrow_right" className={''}/></button>
                </div>
            </div>
        </>
    )
}
