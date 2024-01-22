import React from "react";

const CheckoutForm = ({ items }) => {
  let totalPrice = 0;
  for (let i = 0; i < items?.length; i++) {
    const item = items[i];
    const price = item.price * item.quantity;
    totalPrice += price;
  }

  return (
    <div className="ps-section__footer">
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <figure>
            <figcaption>Coupon Discount</figcaption>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="" />
            </div>
            <div className="form-group">
              <button className="ps-btn ps-btn--outline">Apply</button>
            </div>
          </figure>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <figure>
            <figcaption>Calculate shipping</figcaption>
            <div className="form-group">
              <select className="ps-select select2-hidden-accessible" data-select2-id={1} tabIndex={-1} aria-hidden="true">
                <option value={1} data-select2-id={3}>
                  America
                </option>
                <option value={2}>Italia</option>
                <option value={3}>Vietnam</option>
              </select>
              <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id={2} style={{ width: 120 }}>
                <span className="selection">
                  <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex={0} aria-labelledby="select2-e6zl-container">
                    <span className="select2-selection__rendered" id="select2-e6zl-container" role="textbox" aria-readonly="true" title="America">
                      America
                    </span>
                    <span className="select2-selection__arrow" role="presentation">
                      <b role="presentation" />
                    </span>
                  </span>
                </span>
                <span className="dropdown-wrapper" aria-hidden="true" />
              </span>
            </div>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="Town/City" />
            </div>
            <div className="form-group">
              <input className="form-control" type="text" placeholder="Postcode/Zip" />
            </div>
            <div className="form-group">
              <button className="ps-btn ps-btn--outline">Update</button>
            </div>
          </figure>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <div className="ps-block--shopping-total">
            <div className="ps-block__header">
              <p>
                Subtotal <span> ${totalPrice.toFixed(2)}</span>
              </p>
            </div>
            <div className="ps-block__content">
              <h3>
                Total <span>${totalPrice.toFixed(2)}</span>
              </h3>
            </div>
          </div>
          <a className="ps-btn ps-btn--fullwidth" href="https://nouthemes.net/html/martfury/checkout.html">
            Proceed to checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
