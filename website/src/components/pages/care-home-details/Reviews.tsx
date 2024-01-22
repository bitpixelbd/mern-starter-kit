import React, { useState } from "react";
import SvgIcon from "@/components/SvgIcon";
import ReviewsHistory from "@/components/common/ReviewsHistory";
import UserReview from "@/components/common/UserReview";
import SearchPopup from "@/components/common/pop-up/search-popup";
export default function Reviews({ observerRefs, _ref, singleCareHome }: any) {

  const userReviewArray = singleCareHome?.data?.reviews;
  const userServices = singleCareHome?.data?.services;

  return (
    <div className="review-wrapper" id="reviews-section" ref={_ref}>
      <h1 className="headline-large">Reviews</h1>
      <div className="review-wrap">
        <ReviewsHistory singleCareHome={singleCareHome} />
      </div>
      {
        userReviewArray?.map(item => {
          return <UserReview
            key={item?.id}
            firstName={item?.user_first_name}
            lastName={item?.user_last_name}
            reviewDEscription={item?.desc}
            rating={item?.rating}
            date={item?.date}
            userServices={userServices}
          />
        })
      }

      {/* <UserReview />
      <UserReview />
      <UserReview />
      <UserReview />
      <UserReview /> */}

      {
        userReviewArray?.length > 5 &&
        <button className="primary-text-btn">See More</button>
      }
    </div>
  );
}
