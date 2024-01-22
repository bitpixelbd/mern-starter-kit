import SvgIcon from "@/components/SvgIcon";
import EyeSlash from "@/components/assets/EyeSlash.svg";
import eye from "@/components/assets/eye.svg";
import white_arrow_right from "@/components/assets/white_arrow_right.svg";
import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import { FORM_FORGET_PASSWORD, FORM_SIGNUP, LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_REDIRECT_URL, LOCAL_STORAGE_KEY_TOKEN, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_USER } from "@/config/constants";
import { post } from "@/services/api/api";
import { API_LOGIN_PARTNER, API_LOGIN_USER } from "@/services/api/endpoints";
import { encryptData } from "@/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { object, string } from "yup";
import ErrorMessage from "../../ErrorMessage";
export default function SignInContent({ setCurrenForm, loginRole }) {
  const [token, setToken] = useState(null)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { redirect_url, accessToken } = router.query

  const LOGIN_URL = loginRole === ROLE_USER ? API_LOGIN_USER : API_LOGIN_PARTNER;

  const DASHBOARD_URL = loginRole === ROLE_USER ? `${PAGE_USER_DASBOARD}?page=home_base` : `${PAGE_PARTNER_DASBOARD}?page=referral`;

  const onClickRegister = (formValue) => {
    setCurrenForm(formValue)
  }

  let loginSchema = object({
    email_or_phone: string().required("Email is required"),
    password: string().required("Password is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const loginMutation = useMutation(
    async (data) => await post(LOGIN_URL, data),
    {
      onSuccess: (res) => {
        const userInfo = encryptData(res.data);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);
        window.localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, res?.data?.access_token);

        const saved_redirect = window.localStorage.getItem(LOCAL_STORAGE_KEY_REDIRECT_URL);

        if (saved_redirect) {
          window.localStorage.removeItem(LOCAL_STORAGE_KEY_REDIRECT_URL)
          router.replace(saved_redirect)
          window.location.reload()
        } else {
          router.replace(DASHBOARD_URL)
        }

      },
      onError: (err) => {
        if (err && err?.response?.data) {
          setError(err?.response?.data?.message);
        }
      },
    }
  );

  const onFormSubmit = (data: any) => {
    setError('');
    loginMutation.mutate(data);
  };
  return (
    <div className="register-popup-inner">
      <h1 className="headline-medium">Sign in to your home base</h1>
      {error !== '' &&
        <div className={'alert alert-danger'}>
          {error}
        </div>
      }
      <form noValidate>
        <div className="input-wrap">
          <Input
            register={register}
            name="email_or_phone"
            isRequired={true}
            errors={errors}
            label="Email Or Phone*"
            placeholder="Your email or phone"
            type="text"
          />

        </div>
        <div className="input-wrap">

          <PasswordInput
            name="password"
            errors={errors}
            isRequired={true}
            label="Password"
            register={register}
            placeholder="Enter password"
          />

        </div>
        <div className="forgetBox">
          <Link href="#" onClick={(e) => {
            e.preventDefault();
            onClickRegister(FORM_FORGET_PASSWORD);
          }}>Forgot Password?</Link>
        </div>

        <button className="primary-short-btn primary-full-btn" type="submit" disabled={loginMutation.isLoading} onClick={handleSubmit(onFormSubmit)}>
          {loginMutation.isLoading ? "Loading..." : "Sign In"}
          <SvgIcon name="white_arrow_right" className={""} />
        </button>
      </form>
      <p className="body-regular already-text-line">
        Don’t have an account yet?{" "}
        <span>
          <Link
            className="title-small"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClickRegister(FORM_SIGNUP);
            }}
          >
            Register now
          </Link>
        </span>
      </p>
    </div>
  );
}
