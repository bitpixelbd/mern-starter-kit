"use client";
import { get } from "@/src/services/api/api";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import SingleProduct from "./SingleProduct";

const DealsSection = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: products,
  } = useQuery({
    queryKey: ["allProduct for dealsSection"],
    queryFn: () => get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
  });


  return (
    <div className="ps-deal-of-day">
      <div className="ps-container">
        <div className="ps-section__header">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>Deals of the day</h3>
            </div>
            <div className="ps-block__right">
              <figure>
                <figcaption>End in:</figcaption>
                <ul className="ps-countdown" data-time="December 30, 2021 15:37:25">
                  <li>
                    <span className="days">-720</span>
                  </li>
                  <li>
                    <span className="hours">-20</span>
                  </li>
                  <li>
                    <span className="minutes">-26</span>
                  </li>
                  <li>
                    <span className="seconds">-48</span>
                  </li>
                </ul>
              </figure>
            </div>
          </div>
          {/* <a href="#">View all</a> */}
        </div>
        <div className="ps-section__content">
          <div
            className="ps-carousel--nav owl-slider owl-carousel owl-loaded owl-drag"
            data-owl-auto="false"
            data-owl-loop="false"
            data-owl-speed={10000}
            data-owl-gap={30}
            data-owl-nav="true"
            data-owl-dots="true"
            data-owl-item={7}
            data-owl-item-xs={2}
            data-owl-item-sm={3}
            data-owl-item-md={4}
            data-owl-item-lg={5}
            data-owl-item-xl={6}
            data-owl-duration={1000}
            data-owl-mousedrag="on"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(0px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: 1886,
                }}
              >
                {isSuccess &&
                  products?.map((product) => (
                    <Link key={product?.id} href={`/products/${product?.id}`}>
                      <SingleProduct product={product} />
                    </Link>
                  ))}
              </div>
            </div>
            <div className="owl-nav">
              <button type="button" role="presentation" className="owl-prev disabled">
                <i className="icon-chevron-left" />
              </button>
              <button type="button" role="presentation" className="owl-next">
                <i className="icon-chevron-right" />
              </button>
            </div>
            <div className="owl-dots">
              <button role="button" className="owl-dot active">
                <span />
              </button>
              <button role="button" className="owl-dot">
                <span />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsSection;
