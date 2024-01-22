import React, { useEffect, useState } from 'react';
import RelatedCareItemDetails from "@/components/common/RelatedCareItemDetails";
import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";
import VerifiedBtn from "@/components/common/VerifiedBtn";
import SliderCustomItem from "@/components/common/SliderCustomItem";
import { useRouter } from 'next/router';
import { PAGE_CAREHOMES } from '@/config/constants';
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY } from '@/utils/quiz';
interface Props {
    community: any,
    onClick?: (value: any) => void,
}
export default function RelatedCareItem({ community, onClick }: Props) {
    //quizz
    const [quizz, setQuizzValue] = useState<any>(undefined)
    const slug = community?.slug;
    const router = useRouter()
    const onClickViewDetails = () => {
        router.push(`${PAGE_CAREHOMES}/${slug}`)
    }

    //getting quizz answers from localstorage
    useEffect(() => {
        const quizzAnwers = window.localStorage.getItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY)
        if (quizz === undefined && quizzAnwers) {
            setQuizzValue(quizzAnwers)
        }
    })

    console.log("from related care homes ==>.> ",{ community });

    //care home amenities array [{}]
    const careHomeAmenities: any = []
    community && community?.amenities?.map(amenity => {
        careHomeAmenities.push(amenity)
    })

    return (
        <div className="related-care-item-inner">
            <div className="related-care-item">
                {
                    community?.is_verified && <VerifiedBtn />
                }
                <SliderCustomItem images={community?.images} />

                {/* <PerfectMatchBtn quizz, price, careHomeServices, careHomeAmenities /> */}
                {quizz && <PerfectMatchBtn
                    //care home amenities arr []
                    careHomeAmenities={careHomeAmenities}
                    //quizz parsing {}
                    quizz={JSON.parse(quizz)}
                //care home services arr []
                careHomeServices={community?.services}
                //care home price range obj {}
                price={{ price_end: community?.price_end, price_start: community?.price_start }} 
                />}
            </div>
            <RelatedCareItemDetails
                community={community}
                onClickViewDetails={onClickViewDetails}
            />
        </div>
    );
}

