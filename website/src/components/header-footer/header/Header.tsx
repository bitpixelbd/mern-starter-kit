"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsBagCheck } from "react-icons/bs";
import { useCart } from "react-use-cart";
import CheckoutCart from "../Checkout/CheckoutCart";

const Header = () => {
  const { isEmpty, totalUniqueItems, items } = useCart();
  const { data: session } = useSession()
  return (
    <div className="header header--1" data-sticky="true">

      <div className="header__actions" style={{ backgroundColor: '#1677FF' }}>
        <div style={{ fontSize: '20px', display: 'flex', gap: '10px' }}>
          <Link href="/login">Login</Link>
          <Link href="/register">Registration</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
        <div className="ps-cart--mini">
          <a className="header__extra" href="#">
            <BsBagCheck />
            <span>
              <i>{totalUniqueItems ? totalUniqueItems : "0"}</i> {/*** Cart Items here **/}
            </span>
          </a>
          <CheckoutCart />
        </div>
      </div>
    </div>
  );
};

export default Header;
