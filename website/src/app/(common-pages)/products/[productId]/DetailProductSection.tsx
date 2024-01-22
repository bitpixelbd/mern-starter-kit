"use client";

import { get } from "@/src/services/api/api";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdInsertChartOutlined } from "react-icons/md";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "react-use-cart";
import DetailImage from "./DetailImage";
import ProductContentSection from "./ProductContentSection";

const DetailProductSection = ({ productId }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const {
    isLoading,
    isError,
    error,
    data: product,
  } = useQuery({
    queryKey: ["products details", productId],
    queryFn: () => get(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`),
  });

  const handelAddProduct = ({ product, quantity }) => {
    addItem(product, quantity);
    toast.success("Added product Smart Watches to cart successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (isLoading) return <p>Loading............</p>;

  return (
    <div className="ps-page__left">
      <div className="ps-product--detail ps-product--fullwidth">
        <div className="ps-product__header">
          <div className="ps-product__thumbnail" data-vertical="true">
            <DetailImage product={product} />
          </div>
          <div className="ps-product__info">
            <h1>{product?.title}</h1>
            <div className="ps-product__meta">
              <p>
                Brand:
                <Link href="#">Sony</Link>
              </p>
              <div className="ps-product__rating">
                <div className="br-wrapper br-theme-fontawesome-stars">
                  <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                    <option value={1}>1</option>
                    <option value={1}>2</option>
                    <option value={1}>3</option>
                    <option value={1}>4</option>
                    <option value={2}>5</option>
                  </select>
                  <div className="br-widget br-readonly">
                    <Link href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                    <Link href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                    <Link href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                    <Link href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                    <Link href="#" data-rating-value={2} data-rating-text={5} />
                    <div className="br-current-rating">1</div>
                  </div>
                </div>
                <span>(1 review)</span>
              </div>
            </div>
            <h4 className="ps-product__price">{product?.price} - $56.99</h4>
            <div className="ps-product__desc">
              <p>
                Sold By:
                <Link href="#">
                  <strong> Go Pro</strong>
                </Link>
              </p>
              <p>{product?.description}</p>
            </div>
            <div className="ps-product__variations">
              <figure>
                <figcaption>Color</figcaption>
                <div className="ps-variant ps-variant--color color--1">
                  <span className="ps-variant__tooltip">Black</span>
                </div>
                <div className="ps-variant ps-variant--color color--2">
                  <span className="ps-variant__tooltip"> Gray</span>
                </div>
              </figure>
            </div>
            <div className="ps-product__shopping">
              <figure>
                <figcaption>Quantity</figcaption>
                <div className="border-1">
                  <button className="up" onClick={() => setQuantity(quantity + 1)}>
                    {/* <i className="fa fa-plus" /> */}
                    <GoPlus style={{ fontSize: "30px" }} />
                  </button>
                  <span>{quantity}</span>
                  <button className="down" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
                    {/* <i className="fa fa-minus" /> */}
                    <FiMinus style={{ fontSize: "30px" }} />
                  </button>
                </div>
              </figure>
              <button className="ps-btn ps-btn--black" onClick={() => handelAddProduct({ product, quantity })}>
                Add to cart
              </button>
              <button className="ps-btn">Buy Now</button>
              <div className="ps-product__actions">
                <span>
                  {/* <i className="icon-heart" /> */}
                  <FaRegHeart style={{ fontSize: "30px" }} />
                </span>
                <span>
                  {/* <i className="icon-chart-bars" /> */}
                  <MdInsertChartOutlined style={{ fontSize: "30px" }} />
                </span>
              </div>
            </div>
            <div className="ps-product__specification">
              <Link className="report" href="#">
                Report Abuse
              </Link>
              <p>
                <strong>SKU:</strong> SF1133569600-1
              </p>
              <p className="categories">
                <strong> Categories:</strong>
                <Link href="#">Consumer Electronics</Link>,<Link href="#"> Refrigerator</Link>,<Link href="#">Babies &amp; Moms</Link>
              </p>
              <p className="tags">
                <strong> Tags</strong>
                <Link href="#">sofa</Link>,<Link href="#">technologies</Link>,<Link href="#">wireless</Link>
              </p>
            </div>
            <div className="ps-product__sharing">
              <Link className="facebook" href="#">
                <i className="fa fa-facebook" />
              </Link>
              <Link className="twitter" href="#">
                <i className="fa fa-twitter" />
              </Link>
              <Link className="google" href="#">
                <i className="fa fa-google-plus" />
              </Link>
              <Link className="linkedin" href="#">
                <i className="fa fa-linkedin" />
              </Link>
              <Link className="instagram" href="#">
                <i className="fa fa-instagram" />
              </Link>
            </div>
          </div>
        </div>
        <ProductContentSection />
      </div>
    </div>
  );
};

export default DetailProductSection;
