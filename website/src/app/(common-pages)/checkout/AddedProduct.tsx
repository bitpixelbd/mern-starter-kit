import React from "react";

const AddedProduct = ({ items }) => {
  let subTotal = 0;
  for (let i = 0; i < items?.length; i++) {
    const item = items[i];
    const price = item.price * item.quantity;
    subTotal += price;
  }

  const total = subTotal + 50;

  return (
    <div className="order-1 order-md-2 col-lg-5 col-md-6 right">
      <div className="d-block d-sm-none">
        <div className="checkout-logo">
          <a href="https://martfury.botble.com/" title="MartFury - Laravel Ecommerce system">
            <img src="./Checkout_files/logo-dark.png" alt="MartFury - Laravel Ecommerce system" />
          </a>
        </div>
        <hr />
      </div>
      <div className="position-relative" id="cart-item">
        <div className="payment-info-loading" style={{ display: "none" }}>
          <div className="payment-info-loading-content">
            <i className="fas fa-spinner fa-spin" />
          </div>
        </div>
        <div className="bg-light p-2">
          <p className="font-weight-bold mb-0">Product(s):</p>
        </div>
        <div className="checkout-products-marketplace" id="shipping-method-wrapper">
          {items?.length > 0 ? (
            items?.map((item) => {
              const price = item?.price * item?.quantity;
              return (
                <div className="mt-3 bg-light mb-3">
                  <div className="p-2" style={{ background: "antiquewhite" }}>
                    <img className="img-fluid rounded" src={item?.image} alt="Global Office" width={30} />
                    <span className="font-weight-bold">Global Office</span>
                    <div className="rating_wrap">
                      <div className="rating">
                        <div className="product_rate" style={{ width: "80%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="row cart-item">
                      <div className="col-3">
                        <div className="checkout-product-img-wrapper position-relative">
                          <img className="item-thumb img-thumbnail img-rounded" src={item?.image} alt="Smart Watch External (Digital)" />
                          <span className="position-absolute " style={{ backgroundColor: "#a2a2a2", paddingInline: "8px", paddingBlock: "2px", borderRadius: "50%", left: "80px", top: "-10px" }}>
                            {item?.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <p className="mb-0">{item?.title} </p>
                        <p className="mb-0">
                          <small>(Size: S, Color: Green)</small>
                        </p>
                      </div>
                      <div className="col-auto text-end">
                        <p> ${item?.price}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  
                </div>
              );
            })
          ) : (
            <p> no Product available </p>
          )}
        </div>
      </div>
      <hr />

      <div className="mt-2 p-2">
        <div className="row">
          <div className="col-6">
            <p>Subtotal:</p>
          </div>
          <div className="col-6">
            <p className="price-text sub-total-text text-end">${subTotal}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>Tax:</p>
          </div>
          <div className="col-6 float-end">
            <p className="price-text tax-price-text">$10.00</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p>Shipping fee:</p>
          </div>
          <div className="col-6 float-end">
            <p className="price-text shipping-price-text">$40.00</p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="col-6">
            <p>
              <strong>Total</strong>:
            </p>
          </div>
          <div className="col-6 float-end">
            <p className="total-text raw-total-text" style={{ fontSize: "20px", fontWeight: "700" }}>
              ${total}
            </p>
          </div>
        </div>
      </div>
      <hr />

      <div className="mt-3 mb-5">
        <div className="checkout-discount-section">
          <a className="btn-open-coupon-form text-primary " style={{ cursor: "pointer" }}>
            You have a coupon code?
          </a>
        </div>
        <div className="coupon-wrapper mt-2" style={{ display: "none" }}>
          <div className="btn-group w-100">
            <input className="form-control coupon-code" name="coupon_code" type="text" defaultValue="" placeholder="Enter coupon code..." />
            <button className="apply-coupon-code d-flex align-items-center gap-2" data-url="https://martfury.botble.com/coupon/apply" type="button">
              Apply
            </button>
          </div>
          <div className="coupon-error-msg mt-1">
            <span className="text-danger" />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  );
};

export default AddedProduct;
