import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from "@/components/SvgIcon";
import MatchSingleBtnHover from "@/components/common/MatchSingleBtnHover";
import { getMatchScoring } from '@/utils/quiz';

export default function PerfectMatchSingleBtn({ quizz, careHomeServices, careHomeAmenities, price }) {
    const [isHover, setIsHover] = useState(false);

    const dropShow = (e) => {
        e.preventDefault();
        setIsHover((isHover) => !isHover)
    }
    
    const { unknown, match, livingOptions, amenityOptions, assistanceOptions, memoryCareOptions, priceRangeOptions } = getMatchScoring(quizz, careHomeAmenities, careHomeServices, price)

    return (
        <div className="match-single-btn-wrapper">
            <div className="match-single-btn flex-div-8gap">
                <p className="title-small">Perfect Match:</p>
                <button className="flex-div" onClick={dropShow}>
                    {match} out of {unknown + match}
                    <SvgIcon name="savron_down_danger" className={''} />
                </button>
            </div>
            {
                isHover && <MatchSingleBtnHover setIsHover={setIsHover} quizzMatches={
                    [livingOptions, amenityOptions, assistanceOptions, memoryCareOptions, priceRangeOptions]
                } />
            }
        </div>
    );
}

