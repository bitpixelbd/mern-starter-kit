import React, { useState, useEffect } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import SvgIcon from "@/components/SvgIcon";

export default function TrackProgressTab({ referList }) {
    const [progress, setProgress] = useState(100)

    useEffect(() => {
        const p = referList?.length * 5
        setProgress(Number(p))
    }, [referList])

    return (
        <div className="track-progress-tab-wrapper flex-div-8gap">
            <span className="track-progress-number">{referList?.length}</span>
            <div className="track-progress-tab-inner">
                <ProgressBar now={progress} />
                <div className="star-badge-wrap">
                    <SvgIcon name="Star_Badge" className={'Star_Badge'} />
                    <div className="star-badge-hover-wrap">
                        <p className="label-small">Complete 10 Referrals and receive an additional $1000 gift card</p>
                    </div>
                </div>
                <div className="elite-badge-wrap">
                    <SvgIcon name="Elite_Badge" className={'Elite_Badge'} />
                    <div className="elite-badge-hover-wrap">
                        <p className="label-small">Complete 20 Referrals and receive an additional $2500 gift card</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
