import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import SharePopup from "@/components/common/pop-up/share-popup";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import LogInChoice from "@/components/common/pop-up/component/LogInChoice";
import { useMutation } from "react-query";
import { post } from "@/services/api/api";
import useUser from "@/hooks/userUser";
import { FORM_LOGINCHOICE, LOCAL_STORAGE_KEY_PRICE_COMPARISON, LOCAL_STORAGE_KEY_REDIRECT_URL, PAGE_COMPARISON, ROLE_PARTNER, ROLE_USER } from "@/config/constants";
import { showToast } from "@/utils/toastUtils";
import { API_GET_CARE_HOME, API_POST_FAVOURITE } from "@/services/api/endpoints";
import ComparisonPopup from "@/components/common/pop-up/comparison-popup";
import { useRouter } from "next/router";

export default function SaveShareBtn({ singleCareHome }) {
    const [showShareModal, setShowShareModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showComparisonModal, setShowComparisonModal] = useState(false);
    const [currentPageUrl, setCurrentPageUrl] = useState('');

    const [currentForm, setCurrenForm] = useState(FORM_LOGINCHOICE);
    const [loginRole, setLoginRole] = useState('');
    const [isCareHomeFavourite, setIsCareHomeFavourite] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();


    const { user } = useUser();
    const userId = user?.id;
    let role = user?.role;

    if ((role === undefined) && (typeof window !== 'undefined')) {
        role = localStorage?.getItem("userRole");
    }

    const careHomeId = singleCareHome?.data?.id;
    const isFavourite = singleCareHome?.data?.is_favourite;    // isFavourite return boolean value from api


    const onClickShareReview = async (e) => {
        e.preventDefault();
        setShowShareModal(true);
        setCurrentPageUrl(window?.location?.href)

    }
    const onClickRegister = async () => {
        setShowRegisterModal(true);
    }

    // set care home data to LS for comparing price
    // const onClickCompare = () => {

    //     const carehomeArr = localStorage.getItem(LOCAL_STORAGE_KEY_PRICE_COMPARISON);

    //     if (carehomeArr === null) {
    //         localStorage.setItem(LOCAL_STORAGE_KEY_PRICE_COMPARISON, JSON.stringify([singleCareHome?.data]))
    //         setShowComparisonModal(true);
    //     } else {
    //         const parsedArray = JSON.parse(carehomeArr);

    //         const isExist = parsedArray.find(item => item?.id === singleCareHome?.data?.id)

    //         if (isExist) {
    //             setErrorMessage('Already added to compare list')
    //             setShowComparisonModal(true);
    //             return
    //         }

    //         if (parsedArray.length === 3) {
    //             showToast('warn', 'Cannot add more than 3')
    //             return;
    //         }

    //         const updateCarehomeArr = [...parsedArray, singleCareHome?.data]
    //         localStorage.setItem(LOCAL_STORAGE_KEY_PRICE_COMPARISON, JSON.stringify(updateCarehomeArr));
    //         setShowComparisonModal(true);

    //     }
    // }

    const onClickCompare = () => {
        router.push(`${PAGE_COMPARISON}?care_home_id=${careHomeId}`)
    }



    const favouriteMutation = useMutation(
        async (data) => await post(API_POST_FAVOURITE, data),
        {
            onSuccess: (res) => {
                const isFavouriteResponse = res?.data?.is_favourite;
                console.log(isFavouriteResponse);
                if (isFavouriteResponse) {
                    setIsCareHomeFavourite(true);
                    showToast("success", "added to favourite")
                    window.location.reload();
                } else {
                    setIsCareHomeFavourite(false);
                    showToast("warn", "removed from favourite")
                    window.location.reload();
                }
            },
            onError: (err) => {
                showToast("error", "error occured")
            },
        }
    );

    const onClickFavourite = () => {

        // console.log("fav butt clicked", user, user?.access_token, "role", role);

        if ((Object.keys(user).length === 0 || user === undefined) && user?.access_token === undefined) {
            // console.log("pop up should open");
            setShowRegisterModal(true);
            const redirect_url = window?.location?.href;
            window.localStorage.setItem(LOCAL_STORAGE_KEY_REDIRECT_URL, redirect_url)
            return;
        }


        if (role === ROLE_USER) {

            const payload = {
                care_home_id: careHomeId,
                user_id: userId
            }

            // console.log("role is user", payload);
            favouriteMutation.mutate(payload)

        } else if (role === ROLE_PARTNER) {

            const payload = {
                care_home_id: careHomeId,
                partner_id: userId
            }
            // console.log("role is partner", payload);

            favouriteMutation.mutate(payload)
        }

    }

    return (
        <>
            <div className="save-share-ntm-wrap">
                <button className="flex-div-8gap primary-text-single-btn" onClick={() => onClickFavourite()}>
                    <SvgIcon
                        name={(isCareHomeFavourite || isFavourite) ? 'Heart_active' : 'heart'}
                        className={''}
                    />
                    {
                        (isCareHomeFavourite || isFavourite) ? "Saved" : "Save"
                    }

                </button>
                <button
                    className="flex-div-8gap primary-text-single-btn"
                    onClick={(e) => onClickShareReview(e)}
                >
                    <SvgIcon name="upload" className={''} />
                    Share
                </button>
                <button
                    className="flex-div-8gap primary-text-single-btn"
                    onClick={onClickCompare}
                >
                    <SvgIcon name="Button_Link" className={''} />
                    Compare Pricing
                </button>
            </div>
            <SharePopup
                showModal={showShareModal}
                setShowModal={setShowShareModal}
                currentUrl={currentPageUrl}
                careHomeName={singleCareHome?.data?.name}
            />
            <ComparisonPopup
                setShowModal={(isOpen) => setShowComparisonModal(isOpen)}
                showModal={showComparisonModal}
                errorMessage={errorMessage}
            />
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
                setLoginRole={(role) => {
                    setLoginRole(role)
                }}
            />
            {/* <RegisterPopup showModal={showRegisterModal} setShowModal={setShowRegisterModal} /> */}
        </>
    );
}
