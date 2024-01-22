"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "react-use-cart";
import CartTableRow from "./CartTableRow";
import CheckoutForm from "./CheckoutForm";

const ShoppingCartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0)
  const { isEmpty, totalUniqueItems, items, removeItem, updateItemQuantity } = useCart();


  return (
    <>
      <div className="ps-section--shopping ps-shopping-cart">
        <div className="container">
          <div className="ps-section__header">
            <h1>Shopping Cart</h1>
          </div>
          {!isEmpty ? (
            <>
              <div className="ps-section__content">
                <div className="table-responsive">
                  <table className="table ps-table--shopping-cart ps-table--responsive">
                    <thead>
                      <tr>
                        <th>Product name</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>TOTAL</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {items?.map((item) => (
                        <CartTableRow key={item?.id} item={item} removeItem={removeItem} updateItemQuantity={updateItemQuantity} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="ps-section__cart-actions">
                  <Link className="ps-btn" href="/products">
                    <i className="icon-arrow-left"></i> Back to Shop
                  </Link>
                  <Link className="ps-btn ps-btn--outline" href="/">
                    <i className="icon-sync"></i> Update cart
                  </Link>
                </div>
              </div>
              <CheckoutForm items={items} />
            </>
          ) : (
            <div className="text-center my-5">
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCartPage;
