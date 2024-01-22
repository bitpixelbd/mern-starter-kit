import React from 'react';
import RelatedCareItemSlider from "@/components/common/RelatedCareItemSlider";
import RelatedCareItemDetails from "@/components/common/RelatedCareItemDetails";
import SavedBtn from "@/components/common/SavedBtn";
import SliderCustomItem from "./SliderCustomItem";
import VerifiedBtn from "./VerifiedBtn";
import { useRouter } from 'next/router';
import { PAGE_CAREHOMES } from '@/config/constants';
export default function SavedRelatedCareItem({ isVarified, community, images }) {
    const router = useRouter();
    const slug = community?.slug;

    const onClickViewDetails = () => {
        router.push(`${PAGE_CAREHOMES}/${slug}`)
    }
    return (
        <div className="related-care-item-inner">
            <div className="related-care-item">
                <SavedBtn />
                <SliderCustomItem images={images} />
                {
                    isVarified &&
                    <VerifiedBtn />
                }
            </div>
            <RelatedCareItemDetails 
            community={community} 
            onClickViewDetails={onClickViewDetails} />
        </div>
    );
}

