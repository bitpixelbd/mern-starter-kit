import React from "react";
import RoomTypesSingle from "@/components/common/RoomTypesSingle";
export default function RoomTypes({ observerRefs, _ref , singleCareHome }: any) {
  return (
    <div className="room-types-wrapper" id="room-types-section" ref={_ref}>
      <h1 className="headline-large">Room Types</h1>
      <div className="room-type-wrap">
        {
          singleCareHome?.data?.room_types?.map( roomType =>  <RoomTypesSingle key={roomType.is} roomType={roomType} /> )
        }
        {/*<RoomTypesSingle />*/}
        {/*<RoomTypesSingle />*/}
        {/*<RoomTypesSingle />*/}
        {/*<RoomTypesSingle />*/}
      </div>
    </div>
  );
}
