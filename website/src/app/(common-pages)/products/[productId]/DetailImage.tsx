import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ReactImageZoom from "react-image-zoom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "yet-another-react-lightbox/styles.css";
import "./productDetail.css";

const DetailImage = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const imagesArr = [
    { image: product?.image, id: 1 },
    { image: product?.image, id: 2 },
    { image: product?.image, id: 3 },
    { image: product?.image, id: 4 },
    { image: product?.image, id: 5 },
    { image: product?.image, id: 6 },
  ];


  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagesArr?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-image-div">
              {/* <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: item.image,
                    styles: { width: "200px" },
                  },
                  largeImage: {
                    src: item.image,
                    width: 1200,
                    height: 1200,
                    styles: { width: "200px" },
                  },
                }}
              /> */}
              <img src={item?.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
        {imagesArr?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item?.image} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <figure>
        <div className="ps-wrapper">
          <div className="ps-product__gallery slick-initialized slick-slider" data-arrow="true">
            <Link href="#" className="slick-arrow slick-disabled" aria-disabled="true" style={{}}>
              <i className="fa fa-angle-left" />
            </Link>
            <div aria-live="polite" className="slick-list draggable">
              <div className="slick-track" role="listbox" style={{ opacity: 1, width: 1467 }}>
                <div
                  className="item slick-slide slick-current slick-active"
                  data-slick-index={0}
                  aria-hidden="false"
                  tabIndex={-1}
                  role="option"
                  aria-describedby="slick-slide00"
                  style={{
                    width: 489,
                    position: "relative",
                    left: 0,
                    top: 0,
                    zIndex: 999,
                    opacity: 1,
                  }}
                >
                    <img src={product?.image} alt="" />
                </div>
                <div
                  className="item slick-slide"
                  data-slick-index={1}
                  aria-hidden="true"
                  tabIndex={-1}
                  role="option"
                  aria-describedby="slick-slide01"
                  style={{
                    width: 489,
                    position: "relative",
                    left: "-489px",
                    top: 0,
                    zIndex: 998,
                    opacity: 0,
                    transition: "opacity 500ms ease 0s",
                  }}
                >
                  <Link href="#" tabIndex={-1}>
                    <img src={product?.image} alt="" />
                  </Link>
                </div>
                <div
                  className="item slick-slide"
                  data-slick-index={2}
                  aria-hidden="true"
                  tabIndex={-1}
                  role="option"
                  aria-describedby="slick-slide02"
                  style={{
                    width: 489,
                    position: "relative",
                    left: "-978px",
                    top: 0,
                    zIndex: 998,
                    opacity: 0,
                    transition: "opacity 500ms ease 0s",
                  }}
                >
                  <Link href="#" tabIndex={-1}>
                    <img src={product?.image} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <Link href="#" className="slick-arrow" style={{}} aria-disabled="false">
              <i className="fa fa-angle-right" />
            </Link>
          </div>
        </div>
      </figure> */}
      {/* <div className="ps-product__variants slick-initialized slick-slider slick-vertical" data-item={4} data-md={4} data-sm={4} data-arrow="false">
        <div aria-live="polite" className="slick-list draggable" style={{ height: 280 }}>
          <div
            className="slick-track"
            role="listbox"
            style={{
              opacity: 1,
              height: 210,
              transform: "translate3d(0px, 0px, 0px)",
            }}
          >
            <div className="item slick-slide slick-current slick-active" data-slick-index={0} aria-hidden="false" tabIndex={-1} role="option" aria-describedby="slick-slide10" style={{ width: 60 }}>
              <img src={product?.image} alt="" />
            </div>
            <div className="item slick-slide slick-active" data-slick-index={1} aria-hidden="false" tabIndex={-1} role="option" aria-describedby="slick-slide11" style={{ width: 60 }}>
              <img src={product?.image} alt="" />
            </div>
            <div className="item slick-slide slick-active" data-slick-index={2} aria-hidden="false" tabIndex={-1} role="option" aria-describedby="slick-slide12" style={{ width: 60 }}>
              <img src={product?.image} alt="" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DetailImage;
