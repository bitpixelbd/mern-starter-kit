import Link from "next/link";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";

const CheckoutCart = () => {
  const { isEmpty, items, updateItemQuantity, removeItem } = useCart();

  let subTotal = 0;

  const handelRemoveCart = (id) => {
    removeItem(id);
    toast.success("Removed item from cart successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="ps-cart__content">
      <div className="ps-cart__items">
        {!isEmpty ? (
          items?.map((item) => {
            subTotal = subTotal + item?.price * item?.quantity;

            return (
              <div key={item?.id} className="ps-product--cart-mobile">
                <div className="ps-product__thumbnail">
                  <Link href="#">
                    <img src={item?.image} alt="" />
                  </Link>
                </div>
                <div className="ps-product__content">
                  <button onClick={() => handelRemoveCart(item?.id)} className="ps-product__remove border-0 bg-white">
                    {/* <i className="icon-cross" /> */}
                    <RxCross1 />
                  </button>
                  <a href="h">{item?.title}</a>
                  <p>
                    <strong>Sold by:</strong> YOUNG SHOP
                  </p>
                  <small>{item?.price}</small>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products in the cart.</p>
        )}
      </div>
      {!isEmpty && (
        <div className="ps-cart__footer">
          <h3>
            Sub Total:<strong>${subTotal.toFixed(2)}</strong>
          </h3>
          <figure>
            <Link className="ps-btn" href="/shopping-cart">
              View Cart
            </Link>
            <Link className="ps-btn" href="/checkout">
              Checkout
            </Link>
          </figure>
        </div>
      )}
    </div>
  );
};

export default CheckoutCart;
