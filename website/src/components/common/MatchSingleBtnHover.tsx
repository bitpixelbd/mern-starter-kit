import React, { useEffect, useRef } from 'react';
import SvgIcon from "@/components/SvgIcon";

export default function MatchSingleBtnHover({ setIsHover, quizzMatches }) {
    // let menuRef = useRef();
    // useEffect(() => {
    //     let handler = (e) => {
    //         if (!menuRef.current.contains(e.target)) {
    //             setIsHover(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);
    //     return() => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // });
    const matching: any = []
    quizzMatches?.map(item => {
        if (item !== undefined && item.title !== "" && item?.items?.length) {
            matching.push(item)
        }
    })

    return (

        <div className="match-single-btn-hover-wrap">
            {
                matching?.map(item => {
                    return (
                        <div className="match-single-btn-hover-item flex-div-12gap">
                            <h4 className="title-small">{item?.title}:</h4>
                            <div className="match-single-btn-check-item">
                                {
                                    item?.items?.map(i => {
                                        return (
                                            <div className="flex-div">
                                                <SvgIcon name="Check_green" className={''} />
                                                <h5 className="label-small">{i?.name}</h5>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    )
                })
            }
            {/* <div className="match-single-btn-hover-item flex-div-12gap">
                <h4 className="title-small">Care Type:</h4>
                <div className="match-single-btn-check-item">

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''} />
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''} />
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''} />
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''} />
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                </div>
            </div> */}
            {/* <div className="match-single-btn-hover-item flex-div-12gap">
                <h4 className="title-small">Care Type:</h4>
                <div className="match-single-btn-check-item">

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>

                    <div className="flex-div">
                        <SvgIcon name="Check_green" className={''}/>
                        <h5 className="label-small">Memory Care</h5>
                    </div>
                </div>
            </div> */}
        </div>

    );
}

