import Image from 'next/image';
import User from "./header/assets/User.svg";
import SearchPopup from "@/components/common/pop-up/search-popup";
import React, { useEffect, useState } from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import { FORM_LOGINCHOICE } from '@/config/constants';
import { useRouter } from 'next/router';



export default function LogInInitialBtn() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [currentForm, setCurrenForm] = useState(FORM_LOGINCHOICE);
    const [loginRole, setLoginRole] = useState('');
    

    const onClickRegister = async () => {
        setCurrenForm(FORM_LOGINCHOICE);
        setShowRegisterModal(true);
    }


    return (
        <>
            <div className="LogInInitialBtnWrap">
                <button className="LogInInitialBtn" onClick={() => onClickRegister()}>
                    <Image
                        className="UserIcon"
                        priority
                        src={User}
                        alt=""
                    />
                    Log in
                </button>
            </div>
            <RegisterPopup
                showModal={showRegisterModal}
                loginRole={loginRole}
                currentForm={currentForm}
                setCurrenForm={(value) => {
                    setCurrenForm(value)
                }}

                setShowModal={(isOpen) => {
                    setShowRegisterModal(isOpen)
                }}
                setLoginRole={(show) => {
                    setLoginRole(show)
                }}
            />
        </>
    )
}