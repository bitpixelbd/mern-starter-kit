import React, { useState } from "react";
import RelatedCareItem from "@/components/common/RelatedCareItem";
import UserAdvisor from "@/components/pages/partner-profile/UserAdvisor";
import useUser from "@/hooks/userUser";
import {
  API_GET_RECOMMENDED_COMMUNITY,
  API_GET_USER_PROFILE,
} from "@/services/api/endpoints";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";

export default function HomeBase() {
  const { user } = useUser();

  const {
    isLoading,
    isError,
    error,
    data: recommended_communities,
    isSuccess,
  } = useQuery({
    queryKey: ["recommended-communities"],
    queryFn: () => get(API_GET_RECOMMENDED_COMMUNITY),
  });

  const advisor = recommended_communities?.data?.advisor;

  const recommendedCommunities = recommended_communities?.data?.recommended_communities;

  return (
    <div className="home-base-wrapper">
      <h1 className="display-medium">
        Hi {user?.first_name}, Welcome to your home base!
      </h1>
      <h6 className="body-large home-base-sub-text">
        Keep track of everything in one place and get help from your dedicated
        advisor when you need.
      </h6>
      {
        advisor &&
        <UserAdvisor advisor={advisor} />
      }
      {
        recommendedCommunities &&
        <div className="recommended-communities">
          <h2 className="headline-large title-head">
            Recommended Communities for You
          </h2>
          <div className="recommended-communities-items">
            {recommendedCommunities?.map(
              (community: any) => (
                <RelatedCareItem key={community?.id} community={community} />
              )
            )}
          </div>
        </div>

      }

    </div>
  );
}
