import Image from 'next/image';
import User from "./header/assets/User.svg";
import SvgIcon from "@/components/SvgIcon";
import React from "react";

export default function CareServiceItem({service}) {
    return (
        <div className="care-services-item">
            <SvgIcon name="Care_Types_C" className={''}/>
            <h1 className="title-large">{service?.name}</h1>
            <p className="body-medium">{service?.desc}</p>
        </div>
    )
}