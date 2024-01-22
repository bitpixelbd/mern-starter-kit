import AvailableAmenitieItemContent from "@/components/common/AvailableAmenitieItemContent";
import ProductItemSliderSingle from "@/components/common/ProductItemSliderSingle";
import AvailableAmenitieItem from "@/components/pages/care-home-details/AvailableAmenitieItem";
import { ITEM_COMPARISON, LOCAL_STORAGE_KEY_PRICE_COMPARISON } from '@/config/constants';
import { get } from '@/services/api/api';
import { API_GET_ALL_AMENITIES, API_GET_COMPARISON_BETWEEN } from '@/services/api/endpoints';
import Image from 'next/image';
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import User from "./header/assets/User.svg";
import { useRouter } from "next/router";

export default function ProductItemSlider() {
    // const [careHomes, setCareHomes] = useState([]);

    const router = useRouter();
    const careHomeId: any = router?.query?.care_home_id;


    const { data: amenities } = useQuery({
        queryKey: ['amenities'],
        queryFn: () => get(API_GET_ALL_AMENITIES)
    });

    const { data: comparedCareHomes } = useQuery({
        queryKey: ['comparesCareHomes'],
        queryFn: () => get(`${API_GET_COMPARISON_BETWEEN}?care_home_id=${careHomeId}`),
        enabled: !!(careHomeId)
    });

    const careHomes = comparedCareHomes?.data

    // useEffect(() => {

    //     let carehomeArr;
    //     carehomeArr = localStorage.getItem(LOCAL_STORAGE_KEY_PRICE_COMPARISON);


    //     if (carehomeArr !== undefined || carehomeArr !== null) {
    //         const parsedValue = JSON.parse(carehomeArr);
    //         setCareHomes(parsedValue);
    //     }

    // }, [])


    return (
        <div className="product-item-slider-wrapper">
            <h1 className="display-large comparison-head-title">Comparison between nearby communities</h1>
            <div className="sticky-wrap-care-sidebar product-slide-main">
                <div className="product-item-slider-wrap">
                    {
                        careHomes?.map(item => {
                            return <ProductItemSliderSingle
                                key={item?.id}
                                name={item?.name}
                                address={item?.address}
                                street={item?.street}
                                state={item?.state}
                                postalCode={item?.post_code}
                                startPrice={item?.price_start}
                                endPrice={item?.price_end}
                            />
                        })
                    }
                </div>
            </div>
            <div
                className="accordion main-wrapper available-amenities-wrap comparison-between-wrapper"
                id="accordionExample"
            >

                {
                    amenities?.data?.map((amenity, index) => {
                        return <AvailableAmenitieItem
                            key={amenity?.group_name}
                            amenity={amenity}
                            index={index}
                            careHomes={careHomes}
                            page={ITEM_COMPARISON}

                        />
                    })
                }
            </div>
        </div>
    )
}
