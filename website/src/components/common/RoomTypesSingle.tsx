import SvgIcon from "@/components/SvgIcon";
import React from "react";

export default function RoomTypesSingle({roomType}) {
    return (
        <div className="room-type-single-item">
            <SvgIcon 
            // name="Room_Types_2" 
            className={''} 
            name={roomType?.icon}
            url={roomType?.icon}
            />
            <p className="body-medium">{roomType?.name}</p>
        </div>
    )
}