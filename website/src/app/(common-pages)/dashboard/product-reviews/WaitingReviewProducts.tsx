import React from "react";

const WaitingReviewProducts = () => {
  return (
    <div className="waiting-reviews-products">
      <img className="img-fluid rounded-start ecommerce-product-image" src="https://martfury.botble.com/storage/products/12-150x150.jpg" />
      <div>
        <h6 className="card-title ecommerce-product-name"> EPSION Plaster Printer</h6>
        <div className="text-secondary">
          <span className="d-inline-block me-1">Order completed at:</span>
          <time>Dec 31, 2023 12:12</time>
        </div>
      </div>
    </div>
  );
};

export default WaitingReviewProducts;
