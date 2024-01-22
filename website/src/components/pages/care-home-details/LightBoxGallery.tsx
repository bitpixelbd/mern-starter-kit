"use client";
import { useState } from "react";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import optional lightbox plugins
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import React from "react";

import useDetails from "@/hooks/care-home-details/useDetails";
import Image from "next/image";
import SaveShareBtn from "@/components/pages/care-home-details/SaveShareBtn";
import VerifiedBtn from "@/components/common/VerifiedBtn";
export default function LightBoxGallery({ singleCareHome }: any) {
  const [index, setIndex] = useState(-1);
  const thumbnailsRef = React.useRef(null);

  let imgs = singleCareHome?.data?.images
    ? singleCareHome?.data?.images?.map((img: any) => img?.url)
    : [];

  const mainImg = imgs[0];
  imgs = imgs.slice(1, imgs.length);

  const sideImgs = imgs?.length > 6 ? imgs?.slice(0, 6) : imgs;
  const moreImg = imgs?.length > 6 ? imgs?.slice(6, imgs.length) : [];

  const sideImgsMobile = imgs?.length > 3 ? imgs?.slice(0, 3) : imgs;
  const moreImgMobile = imgs?.length > 3 ? imgs?.slice(3, imgs.length) : [];
  return (
    <>
      <div className="light-box-wrapper">
        <div
          className="hero-img-box"
          onClick={() => setIndex(0)}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <img
            className="hero-img"
            src={mainImg}
            alt=""
            width={1000}
            height={1000}
          />
          {singleCareHome?.data?.is_verified && <VerifiedBtn is_gallery={true} />}
        </div>
        <div className="single-img-box">
          {sideImgs?.map((img: string, i: number) => {
            if (i < sideImgs.length - 1) {
              return (
                <div
                  className="single-img-wrapper"
                  key={`signle-image-${i}`}
                  onClick={() => setIndex(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="single-img"
                    src={img}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                </div>
              );
            } else {
              return (
                <div
                  className="single-img-wrapper "
                  key={`signle-image-${i}`}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="single-img"
                    src={img}
                    alt=""
                    width={100}
                    height={100}
                  />
                  <div className="overly-img-wrapper">
                    <button>
                      +{moreImg?.length} Photos
                      <PhotoAlbum
                        // photos={photos}
                        photos={[
                          {
                            src: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
                            width: 800,
                            height: 600,
                            // href: "https://react-photo-album.com/",
                          },
                        ]}
                        layout="rows"
                        columns={3}
                        targetRowHeight={150}
                        onClick={({ index }) => {
                          setIndex(i + 1);
                        }}
                      />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="mobile-save-share-button">
        <SaveShareBtn singleCareHome={singleCareHome} />
      </div>
      <div className="mobile-light-box-wrapper">
        <div className="single-img-box mobile-light-box-inner">
          <div
            className="hero-img-box"
            onClick={() => setIndex(0)}
            style={{ cursor: "pointer" }}
          >
            <img
              className="hero-img"
              src={mainImg}
              alt=""
              width={100}
              height={100}
            />
          </div>
          {sideImgsMobile?.map((img: string, i: number) => {
            if (i < sideImgsMobile.length - 1) {
              return (
                <div
                  className="single-img-wrapper"
                  key={`signle-image-${i}`}
                  onClick={() => setIndex(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="single-img"
                    src={img}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
              );
            } else {
              return (
                <div
                  className="single-img-wrapper "
                  key={`signle-image-${i}`}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className="single-img"
                    src={img}
                    alt=""
                    width={100}
                    height={100}
                  />
                  <div className="overly-img-wrapper">
                    <button>
                      +{moreImgMobile?.length} Photos
                      <PhotoAlbum
                        // photos={photos}
                        photos={[
                          {
                            src: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
                            width: 800,
                            height: 600,
                            // href: "https://react-photo-album.com/",
                          },
                        ]}
                        layout="rows"
                        columns={3}
                        targetRowHeight={150}
                        onClick={({ index }) => {
                          setIndex(i + 1);
                        }}
                      />
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <Lightbox
        slides={[mainImg, ...imgs].map((img: string) => ({ src: img }))}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Counter]}
        thumbnails={{ ref: thumbnailsRef }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      />
    </>
  );
}
