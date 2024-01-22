import SvgIcon from "@/components/SvgIcon";
import React from "react";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";
import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";


export default function QuizStep5() {
    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Is your loved one currently experiencing any of these conditions?</h1>
                <div className="step-middle">
                    <button className="select-all body-regular">Select all that apply</button>
                    <div>
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
