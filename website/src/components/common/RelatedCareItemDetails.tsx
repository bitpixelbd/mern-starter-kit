import Image from 'next/image';
import Link from "next/link";
import SvgIcon from "@/components/SvgIcon";
import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";
import { formatNumberWithK } from '@/utils/formatPrice';
import ConnectExpert from '@/components/common/pop-up/contact-expert';
import { useState } from 'react';
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from './pop-up/component/contact-expert/expertOptions';

export default function RelatedCareItemDetails({ community, onClickViewDetails }) {

    const [showExpertModal, setShowExpertModal] = useState(false);
    const reviewSum = community?.total_reviews_ratings?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const avgReviewRating = Number(reviewSum) / Number(community?.total_reviews)

    const startPrice = formatNumberWithK(community?.price_start);
    const endtPrice = formatNumberWithK(community?.price_end);

    //Expert sates
    const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
    // per page expert-options based on step
    const expertOption = EXPERTS.find(expert => expert?.step === expertStep)

    const onClickExpert = async () => {
        setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
        setShowExpertModal(true);
    }


    return (
        <>
            <div className="related-care-item-details">
                <h2 className="headline-small"><Link href="#">{community?.name}</Link></h2>
                <div className="flex-div location-wrap locate-wrap-align-start">
                    <SvgIcon name="location_icon" className={''} />
                    <p>{`${community?.address}`}</p>
                </div>
                <div className="main-tag-list-wrapper">
                    <div className="tag-list-wrapper">
                        {
                            community?.services?.map(service => {
                                console.log("service pc in map =={}", service)
                                const style: any = {}
                                if (service?.text_color) {
                                    style.color = `${service?.text_color} !important`
                                }
                                if (service?.bg_color) {
                                    style.backgroundColor = service?.bg_color
                                }
                                return (
                                    <button key={service?.name} className="irish-primary-btn tag-primary-btn" style={style}>{service?.name}</button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="flex-justify-Div">
                    <div className="flex-div">
                        <SvgIcon name="Ratings_icon" className={''} />
                        <div className="flex-div">
                            <p>{isNaN(avgReviewRating) ? 0 : avgReviewRating} </p><button className="primary-text-btn">({community?.total_reviews} Reviews)</button>
                        </div>
                    </div>
                    <div className="price-box">
                        {/* <h2>$5k - $7k <span>/ mo</span></h2> */}
                        <h2>{`$${startPrice} - $${endtPrice}`} <span>/ mo</span></h2>
                    </div>
                </div>
                <div className="flex-div-8gap">
                    <button
                        className="primary-short-btn primary-full-btn"
                        onClick={onClickViewDetails}
                    >
                        View Details
                    </button>
                    <button className="secondary-short-btn primary-full-btn" onClick={() => onClickExpert()}>Get Pricing</button>
                </div>
            </div>
            <ConnectExpert
                showModal={showExpertModal}
                setShowModal={setShowExpertModal}
                expertStep={expertStep}
                setExpertStep={(value) => setExpertStep(value)}
                found={expertOption}
            />
        </>
    );
}
