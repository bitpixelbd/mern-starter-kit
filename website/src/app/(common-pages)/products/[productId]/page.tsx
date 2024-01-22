"use client";
import { useEffect, useState } from "react";
import DetailAdSection from "./DetailAdSection";
import DetailPageHeader from "./DetailPageHeader";
import DetailProductSection from "./DetailProductSection";

const ProductDetailPage = ({ params }) => {
  const { productId } = params;
  return (
    <div>
      <DetailPageHeader />
      <div className="ps-page--product">
        <div className="ps-container">
          <div className="ps-page__container">
            <DetailProductSection productId={productId} />
            <DetailAdSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
