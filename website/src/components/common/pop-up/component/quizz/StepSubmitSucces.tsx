import SvgIcon from "@/components/SvgIcon";
import React from "react";

export default function StepSubmitSucces() {
    return (
        <>
            <div className="step-submit-succes-wrapper">
                <SvgIcon name="success" className={''}/>
                <h1 className="headline-small">We’ve received your request. <br/>One of our expert will reach out to you ASAP!</h1>
            </div>
        </>
    )
}
