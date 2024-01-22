import LogInInitialBtn from "@/components/common/LogInInitialBtn";
import TopSearchBar from "@/components/common/TopSearchBar";
import UserContent from "@/components/common/UserContent";
import MobileMenuTop from "@/components/common/header/component/MobileMenuTop";
import MobileSearchTop from "@/components/common/header/component/MobileSearchTop";
import SvgIcon from "@/components/SvgIcon";
import Link from "next/link";
import React, { useState } from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import useUser from "@/hooks/userUser";
import useUserData from "@/hooks/user/userData";
import useGetSetting from "@/hooks/useGetSetting";
import { useRouter } from "next/router";

export default function TopHead() {
  const { user } = useUser();
  useUserData();

  const router = useRouter();

  const isLoggedIn = !!(user && user.access_token);
  const role = user?.role;

  const { isLoading, isError, error, settingsData } = useGetSetting();

   const onClickLogo = (e) => {
     e.preventDefault();
     window.location.href = "/"
   }

  return (
    <>
      <div className="topHeadWrapper">
        <div className="logoWrap">
          <a href={"/"} onClick={onClickLogo}>
            <img
              className={"Brand_logo"}
              src={settingsData?.logo}//if url then priority of url not imported image
              alt=""

            />
            {/* <SvgIcon name="Brand_Logo" className={"Brand_logo"} /> */}
          </a>
        </div>
        <div className="topSearchWrap">
          <TopSearchBar />
          <MobileSearchTop />
          {isLoggedIn ? <UserContent /> : <LogInInitialBtn />}
          <MobileMenuTop />
        </div>
      </div>
    </>
  );
}
