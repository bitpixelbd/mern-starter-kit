import React from 'react';
import Image from "next/image";
import RightArrow from "@/components/pages/home/assets/RightArrow.svg";

export default function PrimaryShortButton() {
    return (
        <button className="primary-short-btn">
            Start Now
            <Image
                className="RightArrow"
                priority
                src={RightArrow}
                alt="" />
        </button>
    );
}

