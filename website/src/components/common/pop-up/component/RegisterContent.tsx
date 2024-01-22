import SvgIcon from "@/components/SvgIcon";
import EyeSlash from "@/components/assets/EyeSlash.svg";
import eye from "@/components/assets/eye.svg";
import PasswordContainContent from "@/components/common/pop-up/component/PasswordContainContent";
import { FORM_OTP, FORM_SIGNIN, LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_USER } from "@/config/constants";
import { post } from "@/services/api/api";
import { API_REGISTER_PARTNER, API_REGISTER_USER } from "@/services/api/endpoints";
import { encryptData } from "@/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { boolean, number, object, string } from "yup";
import ErrorMessage from "../../ErrorMessage";


export default function RegisterContent(
    { loginRole,
        setCurrenForm
    }
) {

    const [passwordVisible, setPasswordVisible] = useState(false);

    // password suggestion states
    const [hasMinEightChar, setHasMinEightChar] = useState(false);
    const [hasMinOneNumber, setHasMinOneNumber] = useState(false);
    const [hasCapitalLetter, setHasCapitalLetter] = useState(false);
    const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);
    const [error, setError] = useState('')
    const [ref, setRef] = useState<any>(null)
    const { query } = useRouter();

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

    const router = useRouter();

    const REGISTER_URL = loginRole === ROLE_USER ? API_REGISTER_USER : API_REGISTER_PARTNER;

    const onClickSignIn = (formValue) => {
        setCurrenForm(formValue)
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
        async (data) => await post(`${REGISTER_URL}?ref=` + ref, data),
        {
            onSuccess: (res) => {
                const userInfo = encryptData(res.data);
                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
                window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);
                window.localStorage.setItem("userRole", loginRole);
                setCurrenForm(FORM_OTP)
            },
            onError: (err) => {
                if (err && err?.response?.data) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        window.localStorage.setItem("userEmail", data?.email)
        delete data['agree_check']
        registerMutation.mutate(data);
        // console.log(data);
    };

    useEffect(() => {
        if (query.ref && ref === null) {
            setRef(query.ref)
        }
    })

    return (
        <div className="register-popup-inner">
            <h1 className="headline-medium">Register to create your home base</h1>
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                {error !== '' &&
                    <div className={'alert alert-danger'}>
                        {error}
                    </div>
                }
                <div className="name-input-wrap flex-justify-Div">

                    <div className="input-wrap">
                        <h2 className="title-small">First Name*</h2>
                        <input
                            className="code-input body-small"
                            type="text"
                            placeholder="John"
                            {...register("first_name", {
                                required: {
                                    value: true,
                                    message: "this field is required",
                                },
                            })}
                        />

                        {errors.first_name && errors.first_name?.message && (
                            <ErrorMessage
                                text={errors.first_name?.message}
                            />
                        )}
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Last Name*</h2>
                        <input
                            className="code-input body-small"
                            type="text"
                            placeholder="Lee"
                            {...register("last_name", {
                                required: "last name is required",
                            })}
                        />
                        {errors.last_name && errors.last_name?.message && (
                            <ErrorMessage
                                text={errors.last_name?.message}
                            />
                        )}
                    </div>
                </div>
                <div className="input-wrap">
                    <h2 className="title-small">Email Address*</h2>
                    <input
                        className="code-input body-small"
                        type="email"
                        placeholder="john@gmail.com"
                        {...register("email", {
                            required: "Email is required",
                        })}

                    />
                    {errors.email && errors.email?.message && (
                        <ErrorMessage
                            text={errors.email?.message}
                        />
                    )}
                </div>
                <div className="input-wrap">
                    <h2 className="title-small">Phone Number*</h2>
                    <input
                        className="code-input body-small"
                        type="text"
                        placeholder="+1 (125) 455 5456"
                        {...register("phone", {
                            required: "Phone number is required",
                        })}
                    />

                    {errors.phone && errors.phone?.message && (
                        <ErrorMessage
                            text={errors.phone?.message}
                        />
                    )}
                </div>
                {
                    loginRole === 'user' &&

                    <div className="input-wrap">
                        <h2 className="title-small">Post Code</h2>
                        <input
                            className="code-input body-small"
                            type="text"
                            placeholder="1001"
                            {...register("postal_code")}
                        />

                        {errors.postal_code && errors.postal_code?.message && (
                            <ErrorMessage
                                text={errors.postal_code?.message}
                            />
                        )}
                    </div>
                }

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
                {
                    !!(dirtyFields?.password) &&
                    <PasswordContainContent
                        hasMinEightChar={hasMinEightChar}
                        hasMinOneNumber={hasMinOneNumber}
                        hasCapitalLetter={hasCapitalLetter}
                        hasSpecialSymbol={hasSpecialSymbol}
                    />

                }

                <div className="check-inner">
                    <label className="container-level">
                        <input
                            type="checkbox"
                            {...register("agree_check")}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <p className="body-small">By signing up, you agree to senior places terms and privacy policy</p>
                </div>
                {errors.agree_check && errors.agree_check?.message && (
                    <ErrorMessage
                        text={errors.agree_check?.message}
                    />
                )}

                {/* registration failed error messate */}


                <button
                    className="primary-short-btn primary-full-btn"
                    disabled={registerMutation.isLoading}
                >
                    {registerMutation.isLoading ? 'Loading...' : 'Sign up'}
                    <SvgIcon name="white_arrow_right" className={''} />
                </button>
            </form>
            <p className="body-regular already-text-line">Already have an account?  <span>
                <Link
                    className="title-small"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onClickSignIn(FORM_SIGNIN)
                    }}
                > Sign in</Link></span></p>
        </div>
    );
}
