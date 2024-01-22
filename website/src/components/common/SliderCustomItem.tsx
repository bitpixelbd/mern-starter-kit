import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function SliderCustomItem({ images }: any) {
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 3, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //     slidesToSlide: 2, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

  return (
    <div className="slider-custom-item-wrap" style={{ position: "relative" }}>
      {/* <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={{
            desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 1
            },
            mobile: {
                breakpoint: {
                    max: 767,
                    min: 0
                },
                items: 1
            },
            tablet: {
                breakpoint: {
                    max: 1024,
                    min: 767
                },
                items: 1
            }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {images !== undefined &&
          images?.map((img: any) => {
            return (
              <img
                key={img?.id}
                src={img?.url}
                style={{
                  display: "block",
                  height: "100%",
                  margin: "auto",
                  width: "100%",
                }}
              />
            );
          })}
      </Carousel> */}
      <Swiper
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        speed={500}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {images?.map(url => {
          return (
            <SwiperSlide key={url?.id}><img src={url?.url} width={100} height={100} /></SwiperSlide>
          )
        })}

      </Swiper>

    </div>
  );
}
