import React, { useState } from "react";
import RelatedCareItem from "@/components/common/RelatedCareItem";
import UserAdvisor from "@/components/pages/partner-profile/UserAdvisor";
import useUser from "@/hooks/userUser";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { API_GET_PARTNER_ADVISOR, API_GET_RECOMMENDED_COMMUNITY } from "@/services/api/endpoints";


export default function HomeBase() {
  const { user } = useUser();

  const {
    isLoading,
    isError,
    error,
    data: partner_advisor,
    isSuccess,
  } = useQuery({
    queryKey: ["partner_advisor"],
    queryFn: () => get(API_GET_PARTNER_ADVISOR),
  });

  const advisor = partner_advisor?.data?.Advisor;

  return (
    <div className="home-base-wrapper">
      <h1 className="display-medium">Hi {user?.first_name}, Welcome to your home base!</h1>
      <h6 className="body-large home-base-sub-text">Keep track of everything in one place and get help from your dedicated advisor when you need.</h6>
      {
        advisor &&

        <UserAdvisor advisor={advisor} />
      }
    </div>
  );
}
