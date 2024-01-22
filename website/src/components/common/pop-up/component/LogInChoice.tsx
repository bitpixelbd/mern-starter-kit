import { ROLE_PARTNER, ROLE_USER } from "@/config/constants";
import React from "react";
export default function LogInChoice({ setLoginRole}) {

    const onClickLoginChoice = (role) => {
        setLoginRole(role);
    }

    return (
        <div className="register-popup-inner">
            <h1 className="headline-medium">Sign in</h1>
            <div className="choice-btn-wrapper flex-justify-Div">
                <div className="btn-wrap">
                    <p className="body-small">I’m looking for a care home</p>
                    <button
                        className="primary-short-btn primary-full-btn"
                        onClick={() => onClickLoginChoice(ROLE_USER)}
                    >User Login</button>
                </div>
                <div className="btn-wrap">
                    <p className="body-small">I’m a senior places partner</p>
                    <button
                        className="partner-choice-btn primary-full-btn"
                        onClick={() => onClickLoginChoice(ROLE_PARTNER)}
                    >Partner Login</button>
                </div>
            </div>
        </div>
    );
}
