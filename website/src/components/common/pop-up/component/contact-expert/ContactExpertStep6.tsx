import SvgIcon from "@/components/SvgIcon";
import { EXPERT_ANSWER_LOCAL_STORAGE_KEY, setQuizValue } from "@/utils/quiz";
import React, { useState } from "react";

export default function ContactExpertStep6({ step, setStep, expert }) {

    const [location, setLocation] = useState('')

    // console.log('location ' , location);

    const gotoNextStep = () => {
        if (location === '') {
            return alert('Please enter a city or post code')
        }
        setStep(expert.nextStep);

        setQuizValue(step , [location] , EXPERT_ANSWER_LOCAL_STORAGE_KEY)

        // setQuizValue(step , [location])
    }


    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Where are you looking for senior living options?</h1>
                <div className="step-middle">
                    <input
                        className="code-input body-small"
                        type="text"
                        placeholder="Enter city or post code"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="step-btn flex-div-12gap">
                    {
                        expert.prevStep &&
                        <button
                            className="secondary-short-btn flex-div-8gap"
                            onClick={() => setStep(expert.prevStep)}
                        >
                            <SvgIcon name="primary_arrow_left" className={''} />Back
                        </button>

                    }
                    <button className="primary-short-btn" onClick={gotoNextStep} >Continue<SvgIcon name="white_arrow_right" className={''} /></button>
                </div>
            </div>
        </>
    )
}
