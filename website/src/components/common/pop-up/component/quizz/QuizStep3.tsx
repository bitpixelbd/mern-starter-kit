import SvgIcon from "@/components/SvgIcon";
import React from "react";
import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";


export default function QuizStep3() {
    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Check any amenities that you MUST have:</h1>
                <div className="step-middle">
                    <button className="select-all body-regular">Select all that apply</button>
                    <div className="double-line-wrap">
                        <CheckBoxBtn />
                        <CheckBoxBtn />
                        <CheckBoxBtn />
                        <CheckBoxBtn />
                    </div>
                </div>
                <div className="step-btn flex-div-12gap">
                    <button className="secondary-short-btn flex-div-8gap"><SvgIcon name="primary_arrow_left" className={''}/>Back</button>
                    <button className="primary-short-btn">Continue<SvgIcon name="white_arrow_right" className={''}/></button>
                </div>
            </div>
        </>
    )
}
