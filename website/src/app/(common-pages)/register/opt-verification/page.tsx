'use client'


// import SvgIcon from "@/components/SvgIcon";
// import { post } from "@/services/api/api";
// import { API_POST_QUIZ_ANSWERS } from "@/services/api/endpoints";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL, LOCAL_STORAGE_KEY_TOKEN, ROLE_USER } from "@/config/constants";
import { post } from "@/src/services/api/api";
import { API_USER_VERIFY_OTP, DASHBOARD_URL } from "@/src/services/api/endpoints";
import { encryptData } from "@/src/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import OtpInput from 'react-otp-input';
import { useMutation } from "react-query";
import { object, string } from "yup";
import './otpPageStyle.css';

type Payload = {
    email: string | null;
    otp: number;
}

type QuizAnswersPayload = {
    care_recipient: string;
    living_options: string;
    senior_care_services: string;
    memory_care: string;
    amenities: string;
    timeline: string;
    budget: string;
    location: string;
};


export default function OtpVerify() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const router = useRouter()

    const userRole = window.localStorage.getItem('userEmail')



    const REDIRECT_URL = DASHBOARD_URL;


    let loginSchema = object({
        email: string().email().required("Email is required"),
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    // const postQuizAnswerMutation = useMutation(
    // async (data: QuizAnswersPayload) => await post(API_POST_QUIZ_ANSWERS, data),
    // );


    const verifyOtpMutation = useMutation(
        async (data: Payload) => await post(API_USER_VERIFY_OTP, data),
        {
            onSuccess: (res) => {
                // if (forgotVerify) {
                //     setCurrent("password")
                //     window.localStorage.setItem('reset_pass_token', res?.data?.token)
                //     return
                // }
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                window.localStorage.setItem("userRole", userRole);


                const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);

                if (saved_redirect) {
                    window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
                    router.replace(saved_redirect)
                    window.location.reload()
                } else {
                    router.replace(REDIRECT_URL)
                }

            },
            onError: (err) => {
                if (err && err?.response) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        setError('');
        const payload: Payload = {
            email: window.localStorage.getItem('userEmail'),
            otp: Number(otp)
        }
        // if (forgotVerify) {
        //     const resetPassEmail = window.localStorage.getItem("reset_pass_email")
        //     const data = {
        //         otp: otp,
        //         role: loginRole,
        //         email_or_phone: resetPassEmail
        //     }
        //     verifyOtpMutation.mutate(data);
        //     return
        // }
        verifyOtpMutation.mutate(payload);
    };

    return (
        <div className="otp-verify-container">
            {/* <SvgIcon name="otp_icon" className={'otp_icon'} /> */}
            <h2 className="otp-heading">Verify your number or email</h2>
            <p className="otp-description">We’ve sent you an OTP both on your mobile number & email</p>
            <div className="otp-box">

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            {error !== '' &&
                <div className={'d-flex justify-content-center'}>
                    <div className={'alert alert-danger'}>
                        {error}
                    </div>
                </div>
            }
            <div className="verify-btn">
                {
                    <button className="otpVerifyBtn" type="submit" onClick={onFormSubmit}>
                        {/* {verifyOtpMutation.isLoading ? "Please Wait" : "Verify"} */}
                        submit <FaArrowRightLong />
                    </button>
                }
                {/* <button className="primary-short-btn">
                        Verify
                        <SvgIcon name="white_arrow_right" className={''}/>
                    </button> */}
            </div>
        </div>
    )
}
