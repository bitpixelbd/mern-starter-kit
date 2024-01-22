import Image from "next/image";
import Link from "next/link";
import SvgIcon from "@/components/SvgIcon";
import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { PAGE_CAREHOMES } from "@/config/constants";
import { useEffect, useState } from "react";
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from "@/components/common/pop-up/component/contact-expert/expertOptions";
import { formatNumberWithK } from "@/utils/formatPrice";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY } from "@/utils/quiz";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
// import { FreeMode, Pagination } from 'swiper/modules';
export default function SearchItemDetails({ detail }: any) {
  //quizz
  const [quizz, setQuizzValue] = useState<any>(undefined)
  const [showExpertModal, setShowExpertModal] = useState(false);
  //Expert sates
  const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
  // per page expert-options based on step
  const expertOption = EXPERTS.find(expert => expert?.step === expertStep)

  const priceRange = `$${formatNumberWithK(detail?.price_start)} - $${formatNumberWithK(detail?.price_end)}`;

  const slug = detail?.slug

  const onClickExpert = async () => {
    setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
    setShowExpertModal(true);
  }


  //getting quizz answers from localstorage
  useEffect(() => {
    const quizzAnwers = window.localStorage.getItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY)
    if (quizz === undefined && quizzAnwers) {
      setQuizzValue(quizzAnwers)
    }
  })

  //care home amenities array [{}]
  const careHomeAmenities: any = []
  detail && detail?.amanities?.map(amenity => {
    careHomeAmenities.push(amenity)
  })


  return (
    <>
      <div className="search-single-item-details">
        <div className="match-btn">
          {quizz && <PerfectMatchBtn
            //care home amenities arr []
            careHomeAmenities={careHomeAmenities}
            //quizz parsing {}
            quizz={JSON.parse(quizz)}
            //care home services arr []
            careHomeServices={detail?.services}
            //care home price range obj {}
            price={{ price_end: detail?.price_end, price_start: detail?.price_start }} />}
        </div>
        <div className="flex-justify-Div">
          <div className="">
            <h1>
              <Link href="#">{detail.name}</Link>
            </h1>
            <div className="flex-div locate-wrap-align-start">
              <SvgIcon name="location_icon" className={""} />
              <p>{detail.address}</p>
            </div>
          </div>
          <div className="pc-price-box">
            <div className="price-box">
              <p>Price Range</p>
              <h2>
                {priceRange} <span>/ mo</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="pc-rating-box">
          <div className="flex-div rating-box">
            <SvgIcon name="Ratings_icon" className={""} />
            <div className="flex-div">
              <p>{detail.rating} </p>
              <button>
                ({detail?.total_reviews
              } Reviews)
              </button>
            </div>
          </div>
        </div>
        <div className="main-tag-list-wrapper">
          <div className="mobile-search-tag-list-wrapper">
            <div className="search-tag-list-wrapper">
              {
                detail?.services.map((item => {
                      const style: any = {}
                      if (item?.text_color) {
                        style.color = item?.text_color
                      }
                      if (item?.bg_color) style.backgroundColor = item?.bg_color
                      return <button className="irish-primary-btn tag-primary-btn"
                                     style={style}
                      >
                        {item?.name}
                      </button>
                    }
                ))
              }
            </div>
          </div>
          <div className="pc-search-tag-list-wrapper">
            <div className="search-tag-list-wrapper ">
              <Swiper
                  slidesPerView={3}
                  centeredSlides={true}
                  spaceBetween={8}
                  pagination={false}
                  // modules={[FreeMode]}
                  className="mySwiper"
              >
                {
                  detail?.services.map((item => {
                        const style: any = {}
                        if (item?.text_color) {
                          style.color = item?.text_color
                        }
                        if (item?.bg_color) style.backgroundColor = item?.bg_color
                        return <SwiperSlide>
                          <button className="irish-primary-btn tag-primary-btn"
                                  style={style}
                          >
                            {item?.name}
                          </button>
                        </SwiperSlide>
                      }
                  ))
                }
              </Swiper>
            </div>
          </div>
        </div>

        <div className="mobile-rating-price">
          <div className="flex-div rating-box">
            <SvgIcon name="Ratings_icon" className={""} />
            <div className="flex-div">
              <p>{detail.rating} </p>
              <button>
                ({detail?.total_reviews
              } Reviews)
              </button>
            </div>
          </div>
          <div className="price-box">
            <h2>
              {priceRange} <span>/ mo</span>
            </h2>
          </div>
        </div>

        <p className="search-item-des text-show-short">{detail.description}</p>
        <div className="flex-div-8gap mobile-double-btn">
          <Link href={`${PAGE_CAREHOMES}/${slug}`}>
            <button
              className="primary-short-btn"
            >
              View Details
            </button>
          </Link>

          <button
            className="secondary-short-btn"
            onClick={() => onClickExpert()}
          >Get Pricing</button>
        </div>
        <ConnectExpert
          showModal={showExpertModal}
          setShowModal={setShowExpertModal}
          expertStep={expertStep}
          setExpertStep={(value) => setExpertStep(value)}
          found={expertOption}
        />
      </div>
    </>
  );
}
