import SvgIcon from "@/components/SvgIcon";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_SEARCH_RESULT, ROLE_USER } from "@/config/constants";
import { post } from "@/services/api/api";
import { API_REGISTER_USER } from "@/services/api/endpoints";
import { encryptData } from "@/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { boolean, object, string } from "yup";
import { STEP_1_CARE_RECEPIENT } from "./quizOption";
import OtpVerify from "../OtpVerify";
import PasswordContainContent from "../PasswordContainContent";
import Image from "next/image";
import EyeSlash from "@/components/assets/EyeSlash.svg";
import eye from "@/components/assets/eye.svg";
import ErrorMessage from "@/components/common/ErrorMessage";
const VIEW_FORM = 'form'
const VIEW_OTP = 'otp'

export default function QuizStep9({ step, setStep, quiz }) {

    const [currentView, setCurrentView] = useState(VIEW_FORM);

    const [passwordVisible, setPasswordVisible] = useState(false);

    // password suggestion states
    const [hasMinEightChar, setHasMinEightChar] = useState(false);
    const [hasMinOneNumber, setHasMinOneNumber] = useState(false);
    const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
    const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);
    const [error, setError] = useState('')
    const [ref, setRef] = useState<any>(null)
    // const { query } = useRouter();

    function validatePassword(password: string) {
        const minLengthRegex = /^.{8,}$/;
        const hasNumberRegex = /\d/;
        const hasUpperCaseRegex = /[A-Z]/;
        const hasSpecialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        // Check each rule
        const isMinLengthValid = minLengthRegex.test(password);
        const hasNumber = hasNumberRegex.test(password);
        const hasUpperCase = hasUpperCaseRegex.test(password);
        const hasSpecialCharacter = hasSpecialCharacterRegex.test(password);

        setHasMinEightChar(isMinLengthValid);
        setHasMinOneNumber(hasNumber);
        setHasCapitalLetter(hasUpperCase);
        setHasSpecialSymbol(hasSpecialCharacter)

    }



    let userSchema = object({
        first_name: string().required("First name is required"),
        last_name: string().required("Last name is required"),
        phone: string().required("Phone is required"),
        email: string().email().required("Email is required"),
        postal_code: string(),
        password: string().required("Password is required"),
        agree_check: boolean().oneOf([true], 'Please agree to the terms & conditions')
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: yupResolver(userSchema) });

    const registerMutation = useMutation(
        async (data) => await post(API_REGISTER_USER, data),
        {
            onSuccess: (res) => {
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                setCurrentView(VIEW_OTP)
            },
            onError: (err) => {

            },
        }
    );

    const onFormSubmit = (data: any) => {
        window.localStorage.setItem("userEmail", data?.email)
        registerMutation.mutate(data);
    };
    return (
        <>
            <div className="step-wrapper">
                {
                    currentView === VIEW_FORM &&

                    <>
                        <h1 className="headline-small">You’ve almost done! <br /> Register with us to get your perfect matching.</h1>
                        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                            <div className="step-middle">
                                <div className="name-input-wrap flex-justify-Div">
                                    {/* <div className="input-wrap">
                            <h2 className="title-small">First Name</h2>
                            <input className="code-input body-small" type="text" placeholder="Your first name" />
                        </div>
                        <div className="input-wrap">
                            <h2 className="title-small">Last Name</h2>
                            <input className="code-input body-small" type="text" placeholder="Your last name" />
                        </div> */}
                                    <Input
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="first_name"
                                    />
                                    <Input
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="last_name"
                                    />
                                </div>
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                />
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="phone"
                                    type="text"
                                />
                                {/* <div className="input-wrap">
                        <h2 className="title-small">Email Address</h2>
                        <input className="code-input body-small" type="email" placeholder="Your email address" />
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Phone Number</h2>
                        <input className="code-input body-small" type="text" placeholder="Your phone name" />
                    </div> */}
                                {/* <PasswordInput
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name={'password'}
                                    onChange={e => validatePassword(e.target.value)}
                                /> */}
                                <div className="input-wrap">
                                    <h2 className="title-small">Password</h2>
                                    <div className="input-password-wrap">
                                        <input
                                            className="code-input body-small"
                                            type={passwordVisible ? "text" : "password"}
                                            placeholder="Enter password"
                                            {...register("password", {
                                                onChange: e => validatePassword(e.target.value),
                                                required: "* password is required",
                                            })}
                                        />
                                        <Image
                                            className={passwordVisible ? EyeSlash : eye}
                                            priority
                                            src={passwordVisible ? EyeSlash : eye}
                                            alt=""
                                            onClick={() => setPasswordVisible(!passwordVisible)}

                                        />

                                        {/* <SvgIcon name="eye" className={'eye'}/> */}
                                        {/* <SvgIcon name="EyeSlash" className={'EyeSlash'}/> */}
                                    </div>
                                    {errors.password && errors.password?.message && (
                                        <ErrorMessage
                                            text={errors.password?.message}
                                        />
                                    )}
                                </div>

                                {/* <div className="input-wrap">
                        <h2 className="title-small">Password</h2>
                        <div className="input-password-wrap">
                            <input className="code-input body-small" type="text" placeholder="Enter password" />
                            <SvgIcon name="eye" className={'eye'}/>
                            <SvgIcon name="EyeSlash" className={'EyeSlash'}/>
                        </div>
                    </div> */}

                                {
                                    !!(dirtyFields?.password) &&
                                    <PasswordContainContent
                                        hasMinEightChar={hasMinEightChar}
                                        hasMinOneNumber={hasMinOneNumber}
                                        hasCapitalLetter={hasCapitalLetter}
                                        hasSpecialSymbol={hasSpecialSymbol}
                                    />

                                }

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
                                {/* <button className="secondary-short-btn flex-div-8gap"><SvgIcon name="primary_arrow_left" className={''}/>Back</button> */}
                                <button
                                    className="primary-short-btn"
                                    type="submit"
                                    disabled={registerMutation.isLoading}
                                >{registerMutation.isLoading ? 'Please wait...' : 'Get your perfect match'}</button>
                            </div>
                        </form>

                    </>
                }

                {
                    currentView === VIEW_OTP &&
                    <OtpVerify
                        loginRole={ROLE_USER}
                        skipDashboard={true}
                        redirect_url={PAGE_SEARCH_RESULT}
                    />
                }

            </div>
        </>
    )
}
