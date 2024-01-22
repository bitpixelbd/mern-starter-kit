import SvgIcon from "@/components/SvgIcon";
import Input from "@/components/forms/Input";
import { PAGE_SEARCH_RESULT, ROLE_PARTNER, ROLE_USER } from "@/config/constants";
import useUser from "@/hooks/userUser";
import { post } from "@/services/api/api";
import { API_POST_PARTNER_QUIZ_ANSWERS, API_POST_QUIZ_ANSWERS } from "@/services/api/endpoints";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY, getQuizAnswersfromLS, setQuizValue } from "@/utils/quiz";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";

export default function QuizStep8({ step, setStep, quiz }) {
    const { user } = useUser()
    const role = user?.role;
    const route = useRouter();
    const query = route.query;


    const [location, setLocation] = useState('')

    const isLoggedIn = !!(user && user.access_token);

    const API_POST_QUIZ_ANSWERS__BASED_ON_ROLE: string = role === ROLE_USER ? API_POST_QUIZ_ANSWERS : API_POST_PARTNER_QUIZ_ANSWERS;

    // console.log('role: ', user?.role, '||', "isLoggedin:", isLoggedIn);

    const gotoNextStep = () => {
        if (location === '') {
            return alert('Please enter a post code, city or state')
        }
        let nextStep;
        if (quiz.getNextStep) {
            nextStep = quiz.getNextStep(values[0])
        } else {
            nextStep = quiz.nextStep
        }
        setStep(nextStep);

        setQuizValue(step, [location], QUIZ_ANSWER_LOCAL_STORAGE_KEY)
    }



    const postQuizAnswerMutation = useMutation(
        async (data) => await post(API_POST_QUIZ_ANSWERS__BASED_ON_ROLE, data),
    );

    const handelContinue = (e: any) => {
        e.preventDefault();
        if (location === '') {
            return alert('Please enter a post code, city or state')
        }
        const quizAnswers = localStorage.getItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY)

        if (quizAnswers !== null) {
            const payload: any = getQuizAnswersfromLS(QUIZ_ANSWER_LOCAL_STORAGE_KEY);
            payload.location = location;

            postQuizAnswerMutation.mutate(payload)
        }

        route.replace(`${PAGE_SEARCH_RESULT}?city=${location}`)

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
                        quiz.prevStep &&
                        <button
                            className="secondary-short-btn flex-div-8gap"
                            onClick={() => setStep(quiz.prevStep)}
                        >
                            <SvgIcon name="primary_arrow_left" className={''} />Back
                        </button>

                    }
                    {
                        isLoggedIn
                            ?
                            <button
                                className="primary-short-btn"
                                onClick={handelContinue}>
                                Continue
                                <SvgIcon
                                    name="white_arrow_right"
                                    className={''} />
                            </button>
                            :
                            <button
                                className="primary-short-btn"
                                onClick={gotoNextStep}>
                                Continue
                                <SvgIcon
                                    name="white_arrow_right"
                                    className={''} />
                            </button>
                    }
                    {/* <button className="secondary-short-btn flex-div-8gap"><SvgIcon name="primary_arrow_left" className={''}/>Back</button>
                    <button className="primary-short-btn">Continue<SvgIcon name="white_arrow_right" className={''}/></button> */}
                </div>
            </div>
        </>
    )
}
