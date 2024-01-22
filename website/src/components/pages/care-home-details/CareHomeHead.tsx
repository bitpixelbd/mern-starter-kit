import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";
import SvgIcon from "@/components/SvgIcon";
import React, { useEffect, useState } from "react";
import Ratings_icon from "@/components/assets/Ratings_icon.svg";
import PerfectMatchSingleBtn from "@/components/common/PerfectMatchSingleBtn";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY } from "@/utils/quiz";

export default function CareHomeHead({ singleCareHome }: any) {
  const [quizz, setQuizzValue] = useState<any>(undefined)

  useEffect(() => {
    const quizzAnwers = window.localStorage.getItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY)
    if (quizz === undefined && quizzAnwers) {
      setQuizzValue(quizzAnwers)
    }
  })
  // const careHomeServices = 
  const careHomeAmenities: any = []
  singleCareHome && singleCareHome?.data?.amenity?.map(amenity => {
    amenity?.items?.map(item => {
      careHomeAmenities.push(item)
    })
  })

  return (
    <>
      <div className="care-head-wrapper">

        {quizz && <PerfectMatchSingleBtn quizz={JSON.parse(quizz)} careHomeServices={singleCareHome?.data?.services} careHomeAmenities={careHomeAmenities} price={{ price_start: singleCareHome?.data?.price_start, price_end: singleCareHome?.data?.price_end }} />
        }        <h1>{singleCareHome?.data?.name}</h1>
        <div className="review-wrap flex-div{">
          <div className="flex-div rating-box">
            <SvgIcon name="Ratings_icon" className={""} />
            <SvgIcon name="Ratings_icon" className={""} />
            <SvgIcon name="Ratings_icon" className={""} />
            <SvgIcon name="Ratings_icon" className={""} />
            <SvgIcon name="Ratings_icon" className={""} />
            <br />
            <div className="flex-div-8gap">
              <p>{singleCareHome?.data?.total_review_avarage
              } </p>
              <button>({singleCareHome?.data?.reviews?.length} Reviews)</button>
            </div>
          </div>
          <div className="flex-div-8gap locate-wrap-align-start">
            <SvgIcon name="location_icon" className={""} />
            <p>
              {singleCareHome?.data?.address},{singleCareHome?.data?.street},
              {singleCareHome?.data?.state} ,{singleCareHome?.data?.post_code}
            </p>
            {/* <p>333 West 86th Street, New York, NY 10024</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
