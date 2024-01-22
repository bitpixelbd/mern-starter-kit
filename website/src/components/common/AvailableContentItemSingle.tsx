import SvgIcon from "@/components/SvgIcon";
import React from "react";
import AmenityIcon from "../AmenityIcon";

export default function AvailableContentItemSingle({ name, icon, isInactive }) {
    return (
        <div className={`available-amenities-item-content-inner ${isInactive ? 'inactive' : ''}`}>
            <AmenityIcon name={icon} />
            <p className="body-medium">{name}</p>
        </div>
    )
}
