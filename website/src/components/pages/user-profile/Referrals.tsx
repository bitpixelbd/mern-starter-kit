import { get } from "@/services/api/api";
import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import { useQuery } from "react-query";

export default function Referrals({ referList }) {



    // console.log({ referList })

    return (
        <div className="your-referrals-wrapper">
            <h3 className="title-large">Your Referrals</h3>
            <div className="your-referrals-table">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-3">
                            <p className="label-small">Name</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="label-small">Referral ID</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="label-small">Phone Number</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="label-small">Email Address</p>
                        </div>
                    </div>
                    {
                        referList &&
                        referList?.map(item => {
                            return (
                                <div className="row" key={item?.ref_id}>
                                    <div className="col-md-3 col-3">
                                        <p className="body-regular">{item?.user?.name}</p>
                                    </div>
                                    <div className="col-md-3 col-3">
                                        <p className="body-regular">{item?.ref_id}</p>
                                    </div>
                                    <div className="col-md-3 col-3">
                                        <p className="body-regular">{item?.user?.phone}</p>
                                    </div>
                                    <div className="col-md-3 col-3">
                                        <p className="body-regular">{item?.user?.email}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className="row">
                        <div className="col-md-3 col-3">
                            <p className="body-regular">Minh Lee</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">REF00123</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">+1 (235) 256 5698</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">minh@seniorplaces.org</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-3">
                            <p className="body-regular">Minh Lee</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">REF00123</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">+1 (235) 256 5698</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">minh@seniorplaces.org</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-3">
                            <p className="body-regular">Minh Lee</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">REF00123</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">+1 (235) 256 5698</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">minh@seniorplaces.org</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-3">
                            <p className="body-regular">Minh Lee</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">REF00123</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">+1 (235) 256 5698</p>
                        </div>
                        <div className="col-md-3 col-3">
                            <p className="body-regular">minh@seniorplaces.org</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
