"use client";

import { post } from "@/src/services/api/api";
import { API_CHECKOUT } from "@/src/services/api/endpoints";
import { encryptData } from "@/src/services/encryptUtil";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";
import { useCart } from "react-use-cart";
import AddedProduct from "./AddedProduct";
import OrderInfoForm from "./OrderInfoForm";

const CheckOutPage = () => {
  const [isSameAddress, setIsSameAddress] = useState(false);
  const { isEmpty, items, updateItemQuantity, removeItem } = useCart();
  const [isCompanyInvoice, setIsCompanyInvoice] = useState(false);
  const router = useRouter()

  if (items?.length <= 0) {
    return <p>Loading ............</p>;
  }


  const checkoutMuted = useMutation(async (data) => await post(API_CHECKOUT, data), {
    onSuccess: (res) => {
      const userInfo = encryptData(res.data);
      if (res.message === "Success") router.push(`/checkout/${res.data.id}`)
    },
    onError: (err: any) => {
      if (err && err?.response?.data) {
        console.log(err?.response?.data?.message);
      }
    },
  });

  const handelCheckout = (data: any) => {
    const products = items?.map((item: any) => {
      const price: number = item?.price * item?.quantity
      return {
        product_id: item?.id,
        quantity: item?.quantity,
        total: price,
      }
    })


    const shipping = {
      name: data?.name,
      phone: data?.phone,
      city: data?.city,
      email: data?.email,
      country: data?.country,
    };
    let billing = {};

    if (isSameAddress) {
      billing = shipping;
    } else {
      billing = {
        name: data?.billing_name,
        phone: data?.billing_phone,
        city: data?.billing_city,
        email: data?.billing_email,
        country: data?.billing_country,
      };
    }

    const checkoutData: any = {
      product: products,
      shipping,
      billing,
      note: data?.note,
      // payment_method_id: 1,
      is_company_invoice: isCompanyInvoice,
    };

    if (isCompanyInvoice) {
      checkoutData.company_name = data?.company_name;
      checkoutData.company_email = data?.company_email;
      checkoutData.company_address = data?.company_address;
      checkoutData.company_tax = data?.company_taxCode;
    }

    checkoutMuted.mutate(checkoutData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <AddedProduct items={items} />
        <OrderInfoForm
          handelCheckout={handelCheckout}
          setIsSameAddress={setIsSameAddress}
          isSameAddress={isSameAddress}
          setIsCompanyInvoice={setIsCompanyInvoice}
          isCompanyInvoice={isCompanyInvoice}
        />
      </div>
    </div>
  );
};

export default CheckOutPage;
