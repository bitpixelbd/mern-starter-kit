import SvgIcon from "@/components/SvgIcon";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";
import CheckBoxBtn from "../CheckBoxBtn";
import { EXPERT_ANSWER_LOCAL_STORAGE_KEY, getQuizStepValueFromLS, setQuizValue } from "@/utils/quiz";
import { showToast } from "@/utils/toastUtils";


export default function ContactExpertStep1({ title, step, setStep, expert }) {
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const val = getQuizStepValueFromLS(step, EXPERT_ANSWER_LOCAL_STORAGE_KEY);
        setAnswers(val)
    }, [step]);

    const onChangeCheckbox = (value, isChecked) => {
        if (isChecked) {
            setAnswers([
                ...answers,
                value
            ]);
            setError("")
        } else {
            const filtered = answers.filter(i => i !== value);
            setAnswers([
                ...filtered
            ]);
            setError("")
        }
    }

    const onChangeRadio = (value, isChecked) => {
        if (isChecked) {
            setAnswers([value]);
            setError("")
        } else {
            setAnswers([]);
            setError("")
        }
    }

    const showOptions = () => {

        if (expert.button_type && expert.button_type === 'radio') {

            return expert.options.map(item => {
                const isChecked = answers.includes(item.value)
                return (
                    <RedioCheckBtn
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        checked={isChecked}
                        onChange={onChangeRadio}
                    />
                )
            })

        } else if (expert.button_type && expert.button_type === 'checkbox') {

            return expert.options.map(item => <CheckBoxBtn
                key={item.label}
                label={item.label}
                value={item.value}
                checked={answers.includes(item.value)}
                // values={values}
                // setValue={setValues}
                onChange={onChangeCheckbox}
            />)
        }
    }

    const gotoNextStep = () => {

        if (answers.length === 0) {
            setError("Please select a value")
            return;
        }

        // let nextStep;
        if (expert.nextStep) {
            setStep(expert.nextStep);
        }

        setAnswers([])
        // setStep(expert.nextStep);

        //store values in LS
        setQuizValue(step, answers, EXPERT_ANSWER_LOCAL_STORAGE_KEY)

    }

    const gotoPrevStep = () => { setStep(expert?.prevStep) }


    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">{title}</h1>
                <div className="step-middle">
                    {showOptions()}
                </div>
                {error !== '' &&
                    <div className={'alert alert-danger'}>
                        {error}
                    </div>
                }
                <div className="step-btn flex-div-12gap">
                    {
                        expert.prevStep
                        &&
                        <button
                            className="secondary-short-btn flex-div-8gap"
                            onClick={() => gotoPrevStep()}
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
