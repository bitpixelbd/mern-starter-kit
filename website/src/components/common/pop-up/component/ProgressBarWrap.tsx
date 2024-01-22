
import { type } from "os";
import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

type ProgressType ={
    progress: number
}

export default function ProgressBarWrap( {progress}  : ProgressType) {
    // const now = 40;
    return (
        <div className="progress-bar-inner">
            <ProgressBar now={progress} />
        </div>
    )
}
