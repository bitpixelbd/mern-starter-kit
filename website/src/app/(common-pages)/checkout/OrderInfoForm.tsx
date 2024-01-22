"use-client";

import Input from "@/src/components/forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { allCountry } from "./AllCountry";

const OrderInfoForm = ({ handelCheckout, setIsSameAddress, isSameAddress, setIsCompanyInvoice, isCompanyInvoice }) => {
  // const [isSameAddress, setSameShippingInfo] = useState(false);
  // const [isCompanyInvoice, setIsCompanyInvoice] = useState(false);

  let checkOutSchema = object({
    email: string().required("Email is required"),
    name: string().required("Please enter your name"),
    phone: string().required("Please enter your phone number"),
    country: string().required("Please enter your phone number"),
    state: string().required("Please enter your phone number"),
    city: string().required("Please enter your phone number"),
    address: string().required("Please enter your phone number"),
  });

  // const shippingInfo = object({
  //   email: string().required("Email is required"),
  //   name: string().required("Please enter your name"),
  //   phone: string().required("Please enter your phone number"),
  //   country: string().required("Please enter your phone number"),
  //   state: string().required("Please enter your phone number"),
  //   city: string().required("Please enter your phone number"),
  //   address: string().required("Please enter your phone number"),
  // });

  const bullingInfo = object({
    billing_name: string().required("Please enter your phone number"),
    billing_email: string().required("Please enter your phone number"),
    billing_phone: string().required("Please enter your phone number"),
    billing_country: string().required("Please enter your phone number"),
    billing_state: string().required("Please enter your phone number"),
    billing_city: string().required("Please enter your phone number"),
    billing_address: string().required("Please enter your phone number"),
  });

  const companyInfo = object({
    company_name: string().required("Please enter your phone number"),
    company_address: string().required("Please enter your phone number"),
    company_taxCode: string().required("Please enter your phone number"),
    company_email: string().required("Please enter your phone number"),
  });


  if(!isSameAddress){
    checkOutSchema = object({
      ...checkOutSchema.fields,
      ...bullingInfo.fields,
    });
  }

  if(isCompanyInvoice){
     checkOutSchema = object({
      ...checkOutSchema.fields,
      ...companyInfo.fields,
    });
  }


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkOutSchema) });

  return (
    <div className="col-lg-7 col-md-6 left ">
      <form className="form-checkout" onSubmit={handleSubmit(handelCheckout)}>
        <div className="mb-4">
          <h5 className="checkout-payment-title">Shipping information</h5>
          <div className="customer-address-payment-form">
            <div className="address-form-wrapper ">
              <div className="form-group mb-3 ">
                <div className="form-input-wrapper">
                  <label htmlFor="address_name">Full Name</label>
                  <Input register={register} name="name" isRequired={true} errors={errors} placeholder="Your full name" type="text" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-8">
                  <div className="form-group mb-3 ">
                    <div className="form-input-wrapper">
                      <label htmlFor="address_email">Email</label>
                      <Input register={register} name="email" isRequired={true} errors={errors} placeholder="Your full name" type="email" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="form-group mb-3 ">
                    <div className="form-input-wrapper">
                      <label htmlFor="address_phone">Phone</label>
                      <Input register={register} name="phone" isRequired={true} errors={errors} placeholder="Your contract number" type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 ">
                <div className="select--arrow form-input-wrapper">
                  <label htmlFor="address_country">Country</label>
                  <select className="form-control" {...register("country", { required: true })}>
                    <option value="" selected="">
                      Select country...
                    </option>
                    {allCountry?.map(({ name, value }) => (
                      <option key={name} value={value}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <i className="fas fa-angle-down" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-12">
                  <div className="form-group mb-3 ">
                    <div className="form-input-wrapper">
                      <label htmlFor="address_state">State</label>
                      <Input register={register} name="state" isRequired={true} errors={errors} placeholder="Your State" type="text" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12">
                  <div className="form-group mb-3 ">
                    <div className="form-input-wrapper">
                      <label htmlFor="address_city">City</label>
                      <Input register={register} name="city" isRequired={true} errors={errors} placeholder="City" type="text" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group mb-3 ">
                <div className="form-input-wrapper">
                  <label htmlFor="address_address">Address</label>
                  <Input register={register} name="address" isRequired={true} errors={errors} placeholder="Your address" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h5 className="checkout-payment-title">Billing information</h5>
          <div className="customer-billing-address-form">
            <div className="mb-3 form-group">
              <label className="form-label" htmlFor="billing_address_same_as_shipping_address">
                <input name="billing_address_same_as_shipping_address" type="checkbox" onChange={() => setIsSameAddress(!isSameAddress)} /> Same as shipping information
              </label>
            </div>
            {!isSameAddress && (
              <div className="billing-address-form-wrapper">
                <div className="form-group mb-3 ">
                  <div className="form-input-wrapper">
                    <label>Full Name</label>
                    <Input register={register} name="billing_name" isRequired={true} errors={errors} placeholder="Full Name" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-12">
                    <div className="form-group  ">
                      <div className="form-input-wrapper">
                        <label>Email</label>
                        <Input register={register} name="billing_email" isRequired={true} errors={errors} placeholder="Email" type="email" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="form-group  ">
                      <div className="form-input-wrapper">
                        <label>Phone</label>
                        <Input register={register} name="billing_phone" isRequired={true} errors={errors} placeholder="Name" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 ">
                  <div className="select--arrow form-input-wrapper">
                    <select className="form-control" {...register("billing_country", { required: true })}>
                      <option value="">Select country...</option>
                      {allCountry?.map(({ name, value }) => (
                        <option key={name} value={value}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <i className="fas fa-angle-down" />
                    <label>Country</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-12">
                    <div className="form-group mb-3 ">
                      <div className="form-input-wrapper">
                        <label>State</label>
                        <Input register={register} name="billing_state" isRequired={true} errors={errors} placeholder="State" type="text" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <div className="form-group  ">
                      <div className="form-input-wrapper">
                        <label>City</label>
                        <Input register={register} name="billing_city" isRequired={true} errors={errors} placeholder="City" type="text" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3 ">
                  <div className="form-input-wrapper">
                    <label>Address</label>
                    <Input register={register} name="billing_address" isRequired={true} errors={errors} placeholder="Full Address" type="text" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="position-relative mb-4">
          <h5 className="checkout-payment-title">Payment method</h5>
          <input name="amount" type="hidden" defaultValue="1770.12" />
          <input name="currency" type="hidden" defaultValue="USD" />
          <input name="customer_id" type="hidden" defaultValue={11} />
          <input name="customer_type" type="hidden" defaultValue="Botble\Ecommerce\Models\Customer" />
          <ul className="list-group list_payment_method">
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_stripe" name="payment_method" type="radio" defaultValue="stripe" />
              <label className="text-start" htmlFor="payment_stripe">
                Pay online via Stripe (International and Domestic)
              </label>
              <div className="payment_stripe_wrap payment_collapse_wrap collapse " style={{ padding: "15px 0" }}>
                <p>You will be redirected to Stripe to complete the payment. (Debit card/Credit card/Online banking)</p>
              </div>
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_paypal" name="payment_method" type="radio" defaultValue="paypal" />
              <label className="text-start" htmlFor="payment_paypal">
                Fast and safe online payment via PayPal
              </label>
              <div className="payment_paypal_wrap payment_collapse_wrap collapse " style={{ padding: "15px 0" }}>
                <p>You will be redirected to PayPal to complete the payment.</p>
              </div>
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_razorpay" name="payment_method" type="radio" defaultValue="razorpay" />
              <label htmlFor="payment_razorpay">Payment with Razorpay</label>
              <div className="payment_razorpay_wrap payment_collapse_wrap collapse ">
                <p>Razorpay - Best Payment Solution for Online Payments India (Debit card/Credit card/Online banking)</p>
              </div>
              <input id="rzp_order_id" type="hidden" defaultValue="order_NIUhYHwdZzvPVr" />
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_paystack" name="payment_method" type="radio" defaultValue="paystack" />
              <label htmlFor="payment_paystack">Payment with Paystack</label>
              <div className="payment_paystack_wrap payment_collapse_wrap collapse ">
                <p>You will be redirected to Paystack to complete the payment. (Debit card/Credit card/Online banking)</p>
              </div>
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_sslcommerz" name="payment_method" type="radio" defaultValue="sslcommerz" />
              <label htmlFor="payment_sslcommerz">Payment with SSLCommerz</label>
              <div className="payment_sslcommerz_wrap payment_collapse_wrap collapse ">
                <p>You will be redirected to SSLCommerz to complete the payment. (Debit card/Credit card/Online banking)</p>
              </div>
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_cod" name="payment_method" type="radio" defaultValue="cod" defaultChecked="" />
              <label className="text-start" htmlFor="payment_cod">
                Cash on delivery (COD)
              </label>
              <div className="payment_cod_wrap payment_collapse_wrap collapse show" style={{ padding: "15px 0" }}>
                Please pay money directly to the postman, if you choose cash on delivery method (COD).
              </div>
            </li>
            <li className="list-group-item">
              <input className="magic-radio js_payment_method" id="payment_bank_transfer" name="payment_method" type="radio" defaultValue="bank_transfer" />
              <label className="text-start" htmlFor="payment_bank_transfer">
                Bank transfer
              </label>
              <div className="payment_bank_transfer_wrap payment_collapse_wrap collapse " style={{ padding: "15px 0" }}>
                Please send money to our bank account: ACB - 69270 213 19.
              </div>
            </li>
          </ul>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Order notes</label>
          <Input register={register} name="note" isRequired={true} errors={errors} placeholder="Order Note" isTextArea row={4} />
        </div>

        <div className="customer-tax-information-form">
          <label className="form-check-label" htmlFor="with_tax_information">
            <input id="with_tax_information" type="checkbox" value={isCompanyInvoice} onChange={() => setIsCompanyInvoice(!isCompanyInvoice)} /> Requires company invoice (Please fill in your company information to receive the
            invoice)?
          </label>
          {isCompanyInvoice ? (
            <div className="tax-information-form-wrapper">
              <div className="form-group mb-3">
                <div className="form-input-wrapper">
                  <label>Company name</label>
                  <Input register={register} name="company_name" isRequired={true} errors={errors} placeholder="Company Name" type="text" />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="form-input-wrapper">
                  <label>Company address</label>
                  <Input register={register} name="company_address" isRequired={true} errors={errors} placeholder="Company Address" type="text" />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="form-input-wrapper">
                  <label>Company tax code</label>
                  <Input register={register} name="company_taxCode" isRequired={true} errors={errors} placeholder="Company Tax code" type="text" />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="form-input-wrapper">
                  <label>Company email</label>
                  <Input register={register} name="company_email" isRequired={true} errors={errors} placeholder="Company Email" type="text" />
                </div>
              </div>
            </div>
          )
            :""
        }
        </div>

        <div className="row align-items-center g-3">
          <div className="order-2 order-md-1 col-md-6 text-center text-md-start mb-4 mb-md-0">
            <a className="text-info" href="https://martfury.botble.com/cart">
              <i className="fas fa-long-arrow-alt-left" />
              <span className="d-inline-block back-to-cart">Back to cart</span>
            </a>
          </div>
          <div className="order-1 order-md-2 col-md-6">
            <button className="btn-primary p-4 rounded" type="submit">
              Checkout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderInfoForm;
