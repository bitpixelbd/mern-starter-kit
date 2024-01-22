"use client";

import Input from "@/src/components/forms/Input";
import { post } from "@/src/services/api/api";
// import { API_LOGIN_USER } from "@/src/services/api/endpoints";
import { encryptData } from "@/src/services/encryptUtil";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { object, string } from "yup";

const LoginPage = () => {
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

  const loginMutation = useMutation(async (data) => await post("API_LOGIN_USER", data), {
    onSuccess: (res) => {
      const userInfo = encryptData(res.data);
      console.log(res);
    },
    onError: (err) => {
      if (err && err?.response?.data) {
        console.log(err?.response?.data?.message);
      }
    },
  });

  const onFormSubmit = async (data: any) => {
    try {
      const response = await signIn('credentials',
      {
        email: data?.email_or_phone,
        password: data?.password,
        callbackUrl: `/dashboard`,
      }
    )

    console.log("response",response)
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <form className="ps-form--account ps-tab-root">
          <ul className="ps-tab-list">
            <li className="">
              <Link href="/">Login</Link>
            </li>
            <li className="active">
              <Link href="/register">Register</Link>
            </li>
          </ul>
          <div className="ps-tabs">
            <div className="ps-tab active" id="register">
              <div className="ps-form__content">
                <h5>Login your Account</h5>
                <div className="form-group">
                  <Input register={register} name="email_or_phone" isRequired={true} errors={errors} placeholder="Your email or phone" type="email" />
                </div>
                <div className="form-group">
                  <Input register={register} name="password" isRequired={true} errors={errors} placeholder="Give your password" type="password" />
                </div>
                <div className="form-group submtit">
                  <button className="ps-btn ps-btn--fullwidth" onClick={handleSubmit(onFormSubmit)}>
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Don't Have an Account?{" "}
                    <Link href="/register" className="text-primary">
                      Register now
                    </Link>
                  </p>
                </div>
              </div>
              <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <Link className="facebook" href="#">
                      <i className="fa fa-facebook" />
                    </Link>
                  </li>
                  <li>
                    <Link className="google" href="#">
                      <i className="fa fa-google-plus" />
                    </Link>
                  </li>
                  <li>
                    <Link className="twitter" href="#">
                      <i className="fa fa-twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link className="instagram" href="#">
                      <i className="fa fa-instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
