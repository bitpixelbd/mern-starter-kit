import React from 'react';

const MobileHeader = () => {
    return (
      <header className="header header--mobile" data-sticky="true">
        <div className="header__top">
          <div className="header__left">
            <p>Welcome to Martfury Online Shopping Store !</p>
          </div>
          <div className="header__right">
            <ul className="navigation__extra">
              <li>
                <a href="https://nouthemes.net/html/martfury/index.html#">Sell on Martfury</a>
              </li>
              <li>
                <a href="https://nouthemes.net/html/martfury/index.html#">Tract your order</a>
              </li>
              <li>
                <div className="ps-dropdown">
                  <a href="https://nouthemes.net/html/martfury/index.html#">US Dollar</a>
                  <ul className="ps-dropdown-menu">
                    <li>
                      <a href="https://nouthemes.net/html/martfury/index.html#">Us Dollar</a>
                    </li>
                    <li>
                      <a href="https://nouthemes.net/html/martfury/index.html#">Euro</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="ps-dropdown language">
                  <a href="https://nouthemes.net/html/martfury/index.html#">
                    <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/en.png" alt="" />
                    English
                  </a>
                  <ul className="ps-dropdown-menu">
                    <li>
                      <a href="https://nouthemes.net/html/martfury/index.html#">
                        <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/germany.png" alt="" /> Germany
                      </a>
                    </li>
                    <li>
                      <a href="https://nouthemes.net/html/martfury/index.html#">
                        <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/fr.png" alt="" /> France
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="navigation--mobile">
          <div className="navigation__left">
            <a className="ps-logo" href="https://nouthemes.net/html/martfury/index.html">
              <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/logo_light.png" alt="" />
            </a>
          </div>
          <div className="navigation__right">
            <div className="header__actions">
              <div className="ps-cart--mini">
                <a className="header__extra" href="https://nouthemes.net/html/martfury/index.html#">
                  <i className="icon-bag2" />
                  <span>
                    <i>0</i>
                  </span>
                </a>
                <div className="ps-cart__content">
                  <div className="ps-cart__items">
                    <div className="ps-product--cart-mobile">
                      <div className="ps-product__thumbnail">
                        <a href="https://nouthemes.net/html/martfury/index.html#">
                          <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/7.jpg" alt="" />
                        </a>
                      </div>
                      <div className="ps-product__content">
                        <a className="ps-product__remove" href="https://nouthemes.net/html/martfury/index.html#">
                          <i className="icon-cross" />
                        </a>
                        <a href="https://nouthemes.net/html/martfury/product-default.html">MVMTH Classical Leather Watch In Black</a>
                        <p>
                          <strong>Sold by:</strong> YOUNG SHOP
                        </p>
                        <small>1 x $59.99</small>
                      </div>
                    </div>
                    <div className="ps-product--cart-mobile">
                      <div className="ps-product__thumbnail">
                        <a href="https://nouthemes.net/html/martfury/index.html#">
                          <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/5(1).jpg" alt="" />
                        </a>
                      </div>
                      <div className="ps-product__content">
                        <a className="ps-product__remove" href="https://nouthemes.net/html/martfury/index.html#">
                          <i className="icon-cross" />
                        </a>
                        <a href="https://nouthemes.net/html/martfury/product-default.html">Sleeve Linen Blend Caro Pane Shirt</a>
                        <p>
                          <strong>Sold by:</strong> YOUNG SHOP
                        </p>
                        <small>1 x $59.99</small>
                      </div>
                    </div>
                  </div>
                  <div className="ps-cart__footer">
                    <h3>
                      Sub Total:<strong>$59.99</strong>
                    </h3>
                    <figure>
                      <a className="ps-btn" href="https://nouthemes.net/html/martfury/shopping-cart.html">
                        View Cart
                      </a>
                      <a className="ps-btn" href="https://nouthemes.net/html/martfury/checkout.html">
                        Checkout
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
              <div className="ps-block--user-header">
                <div className="ps-block__left">
                  <a href="https://nouthemes.net/html/martfury/my-account.html">
                    <i className="icon-user" />
                  </a>
                </div>
                <div className="ps-block__right">
                  <a href="https://nouthemes.net/html/martfury/my-account.html">Login</a>
                  <a href="https://nouthemes.net/html/martfury/my-account.html">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ps-search--mobile">
          <form className="ps-form--search-mobile" action="https://nouthemes.net/html/martfury/index.html" method="get">
            <div className="form-group--nest">
              <input className="form-control" type="text" placeholder="Search something..." />
              <button>
                <i className="icon-magnifier" />
              </button>
            </div>
          </form>
        </div>
      </header>
    );
};

export default MobileHeader;