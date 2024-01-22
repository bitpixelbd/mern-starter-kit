import SvgIcon from "@/components/SvgIcon";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import { LOCAL_STORAGE_KEY } from "@/config/constants";
import useUser from "@/hooks/userUser";
import { get, patch, post } from "@/services/api/api";
import { API_FILE_UPLOAD, API_GET_USER_PROFILE, API_UPDATE_USER_PASSWORD, API_UPDATE_USER_PROFILE } from "@/services/api/endpoints";
import { encryptData } from "@/services/encryptUtil";
import { showToast } from "@/utils/toastUtils";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

export default function ProfileSetting() {
    const [toggleState, setToggleState] = useState(1);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [updateProfileError, setUpdateProfileError] = useState('');
    // const [updateProfileError, setUpdateProfileError] = useState('');

    const inputRef = useRef(null);

    const toggleTab = ({ index }: { index: any }) => {
        setToggleState(index);
    }

    const { user } = useUser();
    // const id = user?.id;


    const { isLoading, isError, error, data, isSuccess } = useQuery({
        queryKey: ['singleUser'],
        queryFn: () => get(API_GET_USER_PROFILE),
    });


    const userData = isSuccess ? data?.data : {};


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        values: {
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            phone: userData?.phone,
            email: userData?.email,
            city: userData?.city,
            postal_code: userData?.postal_code,
            state: userData?.state,
        }
    });

    // useForm instance for form 2
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm();

    const updateMutation = useMutation(
        async (data) => await patch(`${API_UPDATE_USER_PROFILE}`, data),
        {
            onSuccess: (res) => {
                const access_token = user?.access_token;
                const encryptPayload = {
                    ...res?.data?.data,
                    access_token
                }

                const userInfo = encryptData(encryptPayload);

                window.localStorage.setItem(LOCAL_STORAGE_KEY, userInfo);

                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {
                if (err && err?.response?.data) {
                    setUpdateProfileError(err?.response?.data?.message);
                }
            },
        }
    );

    const passwordMutation = useMutation(
        async (data) => await patch(`${API_UPDATE_USER_PASSWORD}`, data),
        {
            onSuccess: (res) => {
                showToast("success", "Updated Successfully")

                window.location.reload();
            },
            onError: (err) => {
                if (err && err?.response?.status === 401) {
                    setPasswordErrorMessage('Invalid credentials');
                }
                if (err && err?.response?.status === 406) {
                    setPasswordErrorMessage(err?.response?.data?.message);
                }
            },
        }
    );


    const handleClick = () => {
        // open file input box on click of another element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];

        if (!fileObj) {
            return;
        }

        if (fileObj) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }

        let formData = new FormData();

        formData.append('file', event.target.files[0]);


        axios.post(API_FILE_UPLOAD,
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(res => {

            setUrl(res?.data?.data?.url);

        }).catch(err => console.log(err));
    };

    const getProfileImage = () => {
        if (image) {
            return (
                <img
                    className="upload-avater-img"
                    src={image}
                    alt=""
                />
            )
        }

        if (image === null && userData?.profile_photo) {
            return (
                <img
                    className="upload-avater-img"
                    src={userData?.profile_photo}
                    alt=""
                />
            )
        }

        return (
            <SvgIcon name="avater" className={'upload-avater-img'} />
        )
    };

    const onFormSubmit = (data: any) => {
        const payload = {
            ...data
        }
        if (url !== null) {
            payload.profile_photo = url;
        }
        updateMutation.mutate(payload);
    };

    const handlePasswordSubmit = (data: any) => {


        const payload = {
            new_password: data?.new_password,
            current_password: data?.current_password
        }

        passwordMutation.mutate(payload)
    };
    return (
        <div className="profile-setting-wrapper">
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />
            <div className="profile-setting-info-inner">
                <h3 className="title-large">Personal Details</h3>
                <div className="image-upload-wrap">
                    {getProfileImage()}
                    {/* <SvgIcon name="avater" className={'upload-avater-img'} /> */}
                    <button
                        className="flex-div-8gap secondary-short-btn"
                        onClick={handleClick}
                    >
                        <SvgIcon name="camera_icon" className={''} />
                        Upload an image
                    </button>
                </div>
                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>

                    <div className="profile-info-wrap">
                        <div className="name-input-wrap flex-justify-Div">
                            <Input
                                register={register}
                                errors={errors}
                                isRequired={true}
                                name="first_name"
                                label="First Name"
                                placeholder=""
                            />
                            <Input
                                register={register}
                                errors={errors}
                                isRequired={true}
                                name="last_name"
                                label="Last Name"
                                placeholder=""
                            />
                        </div>
                        <Input
                            register={register}
                            errors={errors}
                            isRequired={true}
                            name="email"
                            type="email"
                            label="Email Address"
                            placeholder=""
                        />
                        <Input
                            register={register}
                            errors={errors}
                            isRequired={true}
                            name="phone"
                            type="text"
                            label="Phone"
                            placeholder=""
                        />
                        <div className="name-input-wrap flex-justify-Div">
                            <Input
                                register={register}
                                errors={errors}
                                isRequired={false}
                                name="postal_code"
                                type="text"
                                label="Post Code"
                                placeholder=""
                            />
                            <Input
                                register={register}
                                errors={errors}
                                isRequired={false}
                                name="city"
                                type="text"
                                label="City"
                                placeholder=""
                            />
                            <Input
                                register={register}
                                errors={errors}
                                isRequired={false}
                                name="state"
                                type="text"
                                label="State"
                                placeholder=""
                            />

                        </div>
                        {/* Show Error Message  */}
                    </div>
                    {updateProfileError !== '' &&
                        <div className={'alert alert-danger'}>
                            {updateProfileError}
                        </div>
                    }
                    <div className="profile-setting-btn">



                        <button
                            className="primary-short-btn"
                            disabled={updateMutation.isLoading}
                        > {updateMutation.isLoading ? 'Please wait...' : 'Save Changes'}</button>
                    </div>
                </form>

            </div>

            <form onSubmit={handleSubmit2(handlePasswordSubmit)} noValidate>


                <div className="profile-info-pass-wrap">

                    {/* Show Error Message  */}
                    {passwordErrorMessage !== '' &&
                        <div className={'alert alert-danger'}>
                            {passwordErrorMessage}
                        </div>
                    }

                    <PasswordInput
                        register={register2}
                        errors={errors2}
                        isRequired={true}
                        label={'Current Password'}
                        name={'current_password'}
                    />
                    <PasswordInput
                        register={register2}
                        errors={errors2}
                        isRequired={true}
                        label={'New Password'}
                        name={'new_password'}
                    />

                    <div className="profile-setting-btn">
                        <button
                            className="primary-short-btn"
                            disabled={passwordMutation.isLoading}
                        > {passwordMutation.isLoading ? 'Please wait...' : 'Update New Password'}</button>
                    </div>
                </div>
            </form>


        </div>
    );
}
