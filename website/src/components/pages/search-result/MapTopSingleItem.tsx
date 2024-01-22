import Image from 'next/image';
import Link from "next/link";
import SvgIcon from "@/components/SvgIcon";
import close_bg from "@/components/assets/close_bg.svg";
import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";
import React from "react";
import slider_imahe from "@/components/pages/search-result/assets/slider_imahe.svg";
import PerfectMatchSingleBtn from "@/components/common/PerfectMatchSingleBtn";
import SealCheck from "@/components/assets/SealCheck.svg";
import { formatNumberWithK } from '@/utils/formatPrice';
import { PAGE_CAREHOMES } from '@/config/constants';

interface Props {
    item: any,
    onClick: (value: any) => void,
}

export default function MapTopSingleItem({ name, slug, featuredImage, priceStart, priceEnd, totalReview, reviewCount, isVarified, onClickClose }: any) {

    // console.log(object);

    const priceRange = `$${formatNumberWithK(priceStart)} - ${formatNumberWithK(priceEnd)}`

    const avgReview = totalReview / reviewCount;

    return (
        <div className="map-top-single-item">
            <div className="map-top-single-item-wrap">
                <img
                    className={'close_bg-mobile'}
                    src={close_bg.src}//if url then priority of url not imported image
                    alt=""
                    onClick={onClickClose} />
                {
                    isVarified &&
                    <SvgIcon name="verified_icon" className={'SealCheck-mobile'} />
                }
                <Link className="mobile-map-overlay-card" href={`${PAGE_CAREHOMES}/${slug}`}>
                    <img src={featuredImage} className="slider-single-img" alt='' />

                    <div className="map-single-item-details">
                        <div className="match-btn">
                            {/* <PerfectMatchSingleBtn /> */}
                        </div>
                        <h1><Link href="#">{name}</Link></h1>
                        <div className="flex-justify-Div">
                            <div className="flex-div">
                                <SvgIcon name="Ratings_icon" className={''} />
                                <div className="flex-div">
                                    <p>{isNaN(avgReview) ? 0 : avgReview.toFixed(1)} </p><button className="primary-text-btn">({reviewCount} Reviews)</button>
                                </div>
                            </div>
                            <div className="price-box">
                                <h2>{priceRange}<span>/ mo</span></h2>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
