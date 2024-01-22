import React from 'react';
import SvgIcon from "@/components/SvgIcon";
import { getMatchScoring } from '@/utils/quiz';

export default function PerfectMatchBtn({ quizz, price, careHomeServices, careHomeAmenities }) {
    
    const { unknown, match, } = getMatchScoring(quizz, careHomeAmenities, careHomeServices, price)

    return (
        <div className="match-btn">
            <button className="danger-match flex-div">
                Perfect Match: {match} out of {unknown + match}
                {/*<SvgIcon name="arrow_down" className={''}/>*/}
            </button>
        </div>
    );
}

