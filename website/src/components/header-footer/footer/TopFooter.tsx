import React from "react";

const TopFooter = () => {
  return (
    <div className="ps-footer__widgets">
      <aside className="widget widget_footer widget_contact-us">
        <h4 className="widget-title">Contact us</h4>
        <div className="widget_content">
          <p>Call us 24/7</p>
          <h3>1800 97 97 69</h3>
          <p>
            502 New Design Str, Melbourne, Australia <br />
            <a href="mailto:contact@martfury.co">contact@martfury.co</a>
          </p>
          <ul className="ps-list--social">
            <li>
              <a className="facebook" href="https://nouthemes.net/html/martfury/index.html#">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a className="twitter" href="https://nouthemes.net/html/martfury/index.html#">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a className="google-plus" href="https://nouthemes.net/html/martfury/index.html#">
                <i className="fa fa-google-plus" />
              </a>
            </li>
            <li>
              <a className="instagram" href="https://nouthemes.net/html/martfury/index.html#">
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Quick links</h4>
        <ul className="ps-list--link">
          <li>
            <a href="https://nouthemes.net/html/martfury/policy.html">Policy</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/term-condition.html">Term &amp; Condition</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/shipping.html">Shipping</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/return.html">Return</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/faqs.html">FAQs</a>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Company</h4>
        <ul className="ps-list--link">
          <li>
            <a href="https://nouthemes.net/html/martfury/about-us.html">About Us</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/affilate.html">Affilate</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/shipping.html">Career</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/contact.html">Contact</a>
          </li>
        </ul>
      </aside>
      <aside className="widget widget_footer">
        <h4 className="widget-title">Bussiness</h4>
        <ul className="ps-list--link">
          <li>
            <a href="https://nouthemes.net/html/martfury/our-press.html">Our Press</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/checkout.html">Checkout</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/my-account.html">My account</a>
          </li>
          <li>
            <a href="https://nouthemes.net/html/martfury/shop.html">Shop</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default TopFooter;
