import SvgIcon from "@/components/SvgIcon";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";
import CheckBoxBtn from "../CheckBoxBtn";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY, getQuizStepValueFromLS, setQuizValue } from "@/utils/quiz";
import { STEP_2_LIVING_OPTIONS } from "@/components/common/pop-up/component/quizz/quizOption";
import { showToast } from "@/utils/toastUtils";

export default function QuizStep1({ title, step, setStep, quiz }) {

    const [values, setValues] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const val = getQuizStepValueFromLS(step, QUIZ_ANSWER_LOCAL_STORAGE_KEY);

        setValues(val)
    }, [step]);


    const onChangeCheckbox = (value, isChecked) => {
        if (isChecked) {
            setValues([
                ...values,
                value
            ]);
            setError('')
        } else {
            const filtered = values.filter(i => i !== value);
            setValues([
                ...filtered
            ]);

            setError('')
        }
    }

    const onChangeRadio = (value, isChecked) => {
        if (isChecked) {
            setValues([value]);
            setError('')
        } else {
            setValues([]);
            setError('')
        }
    }

    const showOptions = () => {

        if (quiz.button_type && quiz.button_type === 'radio') {

            return quiz.options.map(item => {
                const isChecked = values.includes(item.value)
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

        } else if (quiz.button_type && quiz.button_type === 'checkbox') {

            return quiz.options.map(item => <CheckBoxBtn
                key={item.label}
                label={item.label}
                value={item.value}
                checked={values.includes(item.value)}
                // values={values}
                // setValue={setValues}
                onChange={onChangeCheckbox}
            />)
        }
    }


    const gotoNextStep = () => {

        if (values.length === 0) {
            setError("Please select a value")
            return;
        }

        let nextStep;

        if (quiz.getNextStep) {

            const livingOption = getQuizStepValueFromLS(STEP_2_LIVING_OPTIONS, QUIZ_ANSWER_LOCAL_STORAGE_KEY);

            if (Array.isArray(livingOption) && livingOption.length) {

                nextStep = quiz.getNextStep(livingOption[0])
            } else {

                nextStep = quiz.getNextStep(values[0])
            }
        } else {
            nextStep = quiz.nextStep
        }

        setValues([])
        setStep(nextStep);

        //store values in LS
        setQuizValue(step, values, QUIZ_ANSWER_LOCAL_STORAGE_KEY)

    }

    const gotoPrevStep = () => {

        const livingOption = getQuizStepValueFromLS(STEP_2_LIVING_OPTIONS, QUIZ_ANSWER_LOCAL_STORAGE_KEY);

        if (quiz?.getPrevStep) {

            if (Array.isArray(livingOption) && livingOption.length) {

                const prevStep = quiz?.getPrevStep(livingOption[0]);

                setStep(prevStep)

            }
        }
        else {

            if (quiz.prevStep) {

                setStep(quiz?.prevStep)
            }
        }
    }

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
                        (quiz.prevStep || quiz.getPrevStep) &&
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
