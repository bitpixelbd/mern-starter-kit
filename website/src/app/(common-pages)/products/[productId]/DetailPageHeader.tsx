import Link from "next/link";
import React from "react";

const DetailPageHeader = () => {
  return (
    <div className="ps-breadcrumb">
      <div className="ps-container">
        <ul className="breadcrumb">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Refrigerators</Link>
          </li>
          <li>Marshall Kilburn Portable Wireless Speaker</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailPageHeader;
