"use client";

import { useState } from "react";
import ReviewsProducts from "./ReviewsProducts";
import WaitingReviewProducts from "./WaitingReviewProducts";

const ProductReviews = () => {
  const [button, setButton] = useState("waiting");

  return (
    <>
      <div className="section-header">
        <h3>Product Reviews</h3>
      </div>
      <div className="section-content product-reviews-page ">
        <div className="d-flex">
          <button onClick={() => setButton("waiting")} className={`${button === "waiting" ? "reviews-active-button" : "reviews-button"}`}>
            Waiting for your review (0)
          </button>
          <button onClick={() => setButton("reviewed")} className={`${button === "reviewed" ? "reviews-active-button" : "reviews-button"}`}>
            Reviewed (23)
          </button>
        </div>
        <hr />

        {button === "waiting" ? <WaitingReviewProducts /> : <ReviewsProducts />}

        <div className="modal fade" id="product-review-modal" aria-labelledby="product-review-modal-label" aria-hidden="true" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header position-absolute border-0 top-0 end-0">
                <button className="btn-close" data-dismiss="modal" data-bs-dismiss="modal" type="button" aria-label="Close" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
