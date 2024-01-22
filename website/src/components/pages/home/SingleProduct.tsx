import Link from "next/link";
import React from "react";

const SingleProduct = ({ product }) => {
  const { price, title, image } = product;

  return (
    <div className="owl-item active" style={{ width: "205.714px", marginRight: 30 }}>
      <div className="ps-product ps-product--inner">
        <div className="ps-product__thumbnail">
          <Link href={`/products/${product?.id}`}>
            <img src={image} alt="" />
          </Link>
          <div className="ps-product__badge">-16%</div>
          <ul className="ps-product__actions">
            <li>
              <Link href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Read More">
                <i className="icon-bag2" />
              </Link>
            </li>
            <li>
              <Link href="#" data-placement="top" title="Quick View" data-toggle="modal" data-target="#product-quickview">
                <i className="icon-eye" />
              </Link>
            </li>
            <li>
              <Link href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add to Whishlist">
                <i className="icon-heart" />
              </Link>
            </li>
            <li>
              <Link href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Compare">
                <i className="icon-chart-bars" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="ps-product__container">
          <p className="ps-product__price sale">
            {price} <del>$670.00 </del>
            <small>18% off</small>
          </p>
          <div className="ps-product__content">
            <Link className="ps-product__title" href="#">
              {title}
            </Link>
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
                  <Link href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current">
                    {" "}
                  </Link>
                  <Link href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current">
                    {" "}
                  </Link>
                  <Link href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current">
                    {" "}
                  </Link>
                  <Link href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current">
                    {" "}
                  </Link>
                  <Link href="#" data-rating-value={2} data-rating-text={5}>
                    {" "}
                  </Link>
                  <div className="br-current-rating">1</div>
                </div>
              </div>
              <span>01</span>
            </div>
            <div className="ps-product__progress-bar ps-progress" data-value={82}>
              <div className="ps-progress__value">
                <span style={{ width: "82%" }} />
              </div>
              <p>Sold:39</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
