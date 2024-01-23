'use client'


// import SvgIcon from "@/components/SvgIcon";
// import { post } from "@/services/api/api";
// import { API_POST_QUIZ_ANSWERS } from "@/services/api/endpoints";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL, LOCAL_STORAGE_KEY_TOKEN, LOCAL_STORAGE_USER_EMAIL, ROLE_USER } from "@/config/constants";
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
import { signIn } from "next-auth/react";

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


    const verifyOtpMutation = useMutation(
        async (data: Payload) => await signIn("credentials", { ...data, redirect: false, otpVerfication: true }),
        {
            onSuccess: async (res) => {
                if (res?.ok) {
                    window.localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
                    router.push("/");
                }
                if (!res?.ok) {
                    setError(res?.error)
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
