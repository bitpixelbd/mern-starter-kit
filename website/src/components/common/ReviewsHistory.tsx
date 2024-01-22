import SvgIcon from "@/components/SvgIcon";
import ReviewHistoryItem from "@/components/common/ReviewHistoryItem";
import React, { useState } from "react";
import WriteReviewPopup from "@/components/common/pop-up/write-review-popup";

export default function ReviewsHistory({ singleCareHome }) {
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);

    const onClickWriteReview = async () => {
        setShowWriteReviewModal(true);
    }
    const careHomeId = singleCareHome?.data?.id;
    const careHomeName = singleCareHome?.data?.name;

    const ratingArray = singleCareHome?.data?.rating_summary;

    const totalSumOfRatings = ratingArray?.map(item => item?.rating)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const averageRating = (totalSumOfRatings / ratingArray?.length).toFixed(1) || 0;

    return (
        <div className="review-history">
            <div className="review-history-head flex-justify-Div">
                <div className="flex-div-single">
                    <button className="flex-div-8gap overall-rating-btn">
                        <SvgIcon name="Ratings_white" className={''} />
                        {averageRating}
                    </button>
                    <p className="title-large">Overall Ratings</p>
                </div>
                <div>
                    <button className="secondary-short-btn flex-div-8gap" onClick={() => onClickWriteReview()}>
                        <SvgIcon name="edit_primary" className={''} />
                        Write a Review
                    </button>
                </div>
            </div>
            <div className="review-history-content">
                {
                    ratingArray &&
                    ratingArray?.map(item => <ReviewHistoryItem key={item?.name} name={item?.name} rating={item?.rating} />)
                }
            </div>
            <WriteReviewPopup
                showModal={showWriteReviewModal}
                setShowModal={setShowWriteReviewModal}
                careHomeId={careHomeId}
                careHomeName={careHomeName}
            />
        </div>

    )
}