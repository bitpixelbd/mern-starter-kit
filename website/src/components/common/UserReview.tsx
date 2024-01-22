import React from 'react';
import SvgIcon from "@/components/SvgIcon";
import { formatDate } from '@/services/dateUtils';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
export default function UserReview({ firstName, lastName, date, rating, reviewDEscription, userServices }) {

    const reviewDate = formatDate(date);
    return (
        <div className="user-review-wrapper">
            <div className="user-item flex-div-12gap">
                <SvgIcon name="users" className={'user-avater-icon'} />
                <div>
                    <h2 className="title-large">{firstName} {lastName}</h2>
                    <p className="label-large">{reviewDate}</p>
                    {/* <p className="label-large">02 September, 2023</p> */}
                </div>
            </div>
            <div className="user-review-rating">
                <div className="flex-div-single">
                    <div className="flex-div">
                        <SvgIcon name="Ratings" className={''} />
                        <p>{rating}</p>
                    </div>
                    {/*{*/}
                    {/*    userServices && userServices?.map(item => {*/}
                    {/*        const style: any = {}*/}
                    {/*        if (item?.text_color) {*/}
                    {/*            style.color = item?.text_color*/}
                    {/*        }*/}
                    {/*        if (item?.bg_color) {*/}
                    {/*            style.backgroundColor = item?.bg_color*/}
                    {/*        }*/}
                    {/*        return (*/}
                    {/*            <button className="tag-primary-btn irish-primary-btn" style={style} >{item?.name}</button>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                    <div className="main-tag-list-wrapper">
                        <div className="mobile-search-tag-list-wrapper">
                            <div className="search-tag-list-wrapper">
                                {
                                    userServices && userServices?.map(item => {
                                        const style: any = {}
                                        if (item?.text_color) {
                                            style.color = item?.text_color
                                        }
                                        if (item?.bg_color) {
                                            style.backgroundColor = item?.bg_color
                                        }
                                        return (
                                            <button className="tag-primary-btn irish-primary-btn" style={style} >{item?.name}</button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="pc-search-tag-list-wrapper">
                            <div className="search-tag-list-wrapper ">
                                <Swiper
                                    slidesPerView={'auto'}
                                    centeredSlides={true}
                                    spaceBetween={8}
                                    pagination={false}
                                    // modules={[FreeMode]}
                                    className="mySwiper"
                                >
                                    {
                                        userServices && userServices?.map(item => {
                                            const style: any = {}
                                            if (item?.text_color) {
                                                style.color = item?.text_color
                                            }
                                            if (item?.bg_color) {
                                                style.backgroundColor = item?.bg_color
                                            }
                                            return (
                                                <SwiperSlide>
                                                    <button className="tag-primary-btn irish-primary-btn" style={style} >{item?.name}</button>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="body-medium">{reviewDEscription}</p>
                {/* <p className="body-medium">I can't express how grateful I am for the wonderful care my mother receives here. The staff is not just professional but genuinely caring. Mom loves the activities and her new friends. It feels like a big family. Highly recommend!</p> */}
            </div>
        </div>
    );
}

