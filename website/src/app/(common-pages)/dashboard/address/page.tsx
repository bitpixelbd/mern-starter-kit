import React from "react";
import AddressCart from "./AddressCart";

const AddressPage = () => {
  return (
    <div>
      <>
        <h2 className="page-title">Address books</h2>
        <div className="customer-list-order order-table">
          <AddressCart />
        </div>
      </>
    </div>
  );
};

export default AddressPage;
