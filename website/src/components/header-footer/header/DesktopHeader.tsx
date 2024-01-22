"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BsBagCheck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaChevronDown, FaRegUser } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import { useCart } from "react-use-cart";
import CheckoutCart from "../Checkout/CheckoutCart";
import NavItems from "./NavItems";
import logo from "./logo.png";
import { productsOptions } from "./options";

const DesktopHeader = () => {
  const { isEmpty, totalUniqueItems, items } = useCart();
  const { data: session } = useSession()
  return (
    <div className="header header--1" data-sticky="true">
      <div className="header__top">
        <div className="ps-container">
          <div className="header__left">
            <div className="menu--product-categories">
              <div className="menu__toggle">
                <i className="icon-menu" />
                <span> Shop by Department</span>
              </div>
              <div className="menu__content">
                {/* <ul className="menu--dropdown">
                  <li>
                    <a href="#.html">Hot Promotions</a>
                  </li>
                  <li className="menu-item-has-children has-mega-menu">
                    <a href="#">Consumer Electronic</a>
                    <span className="sub-toggle" />
                    <div className="mega-menu">
                      <div className="mega-menu__column">
                        <h4>
                          Electronic
                          <span className="sub-toggle" />
                        </h4>
                        <ul className="mega-menu__list">
                          <li>
                            <a href="#.html">Home Audio &amp; Theathers</a>
                          </li>
                          <li>
                            <a href="#.html">TV &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#.html">Camera, Photos &amp; Videos</a>
                          </li>
                          <li>
                            <a href="#.html">Cellphones &amp; Accessories</a>
                          </li>
                          <li>
                            <a href="#.html">Headphones</a>
                          </li>
                          <li>
                            <a href="#.html">Videosgames</a>
                          </li>
                          <li>
                            <a href="#.html">Wireless Speakers</a>
                          </li>
                          <li>
                            <a href="#.html">Office Electronic</a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu__column">
                        <h4>
                          Accessories &amp; Parts
                          <span className="sub-toggle" />
                        </h4>
                        <ul className="mega-menu__list">
                          <li>
                            <a href="#.html">Digital Cables</a>
                          </li>
                          <li>
                            <a href="#.html">Audio &amp; Video Cables</a>
                          </li>
                          <li>
                            <a href="#.html">Batteries</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#.html">Clothing &amp; Apparel</a>
                  </li>
                  <li>
                    <a href="#.html">Home, Garden &amp; Kitchen</a>
                  </li>
                  <li>
                    <a href="#.html">Health &amp; Beauty</a>
                  </li>
                  <li>
                    <a href="#.html">Yewelry &amp; Watches</a>
                  </li>
                  <li className="menu-item-has-children has-mega-menu">
                    <a href="#">Computer &amp; Technology</a>
                    <span className="sub-toggle" />
                    <div className="mega-menu">
                      <div className="mega-menu__column">
                        <h4>
                          Computer &amp; Technologies
                          <span className="sub-toggle" />
                        </h4>
                        <ul className="mega-menu__list">
                          <li>
                            <a href="#.html">Computer &amp; Tablets</a>
                          </li>
                          <li>
                            <a href="#.html">Laptop</a>
                          </li>
                          <li>
                            <a href="#.html">Monitors</a>
                          </li>
                          <li>
                            <a href="#.html">Networking</a>
                          </li>
                          <li>
                            <a href="#.html">Drive &amp; Storages</a>
                          </li>
                          <li>
                            <a href="#.html">Computer Components</a>
                          </li>
                          <li>
                            <a href="#.html">Security &amp; Protection</a>
                          </li>
                          <li>
                            <a href="#.html">Gaming Laptop</a>
                          </li>
                          <li>
                            <a href="#.html">Accessories</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#.html">Babies &amp; Moms</a>
                  </li>
                  <li>
                    <a href="#.html">Sport &amp; Outdoor</a>
                  </li>
                  <li>
                    <a href="#.html">Phones &amp; Accessories</a>
                  </li>
                  <li>
                    <a href="#.html">Books &amp; Office</a>
                  </li>
                  <li>
                    <a href="#.html">Cars &amp; Motocycles</a>
                  </li>
                  <li>
                    <a href="#.html">Home Improments</a>
                  </li>
                  <li>
                    <a href="#.html">Vouchers &amp; Services</a>
                  </li>
                </ul> */}
                <ul className="menu--dropdown">
                  {productsOptions?.map((item, index) => (
                    <li key={index}>
                      <Link href="#">{item?.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link className="ps-logo" href="/">
              <h2 className="fs-2 text-white">Bit Pixel BD</h2> {/*  TODO Here are not importing image I don't know why**/}
            </Link>
          </div>
          <div className="header__center">
            <form className="ps-form--quick-search" action="" method="get">
              <div className="form-group--icon d-flex align-items-center flex-row-reverse">
                {/* <i className="icon-chevron-down" /> */}
                <div style={{ margin: "-25px", paddingRight: "20px" }}>
                  <FaChevronDown />
                </div>
                <select className="form-control" style={{ width: "150px" }}>
                  {productsOptions?.map((item, index) => (
                    <option key={index} className="level-1" value={item?.value}>
                      {item?.text}
                    </option>
                  ))}
                </select>
              </div>
              <input className="form-control " type="text" placeholder="I'm shopping for..." id="input-search" />
              <button>Search</button>
              <div className="ps-panel--search-result">
                <div className="ps-panel__content">
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Apple iPhone Retina 6s Plus 32GB
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span />
                      </div>
                      <p className="ps-product__price">$990.50</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Apple iPhone Retina 6s Plus 64GB
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span />
                      </div>
                      <p className="ps-product__price">$1120.50</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Apple iPhone Retina 6s Plus 128GB
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span />
                      </div>
                      <p className="ps-product__price">$1220.50</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Marshall Kilburn Portable Wireless Speaker
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span>01</span>
                      </div>
                      <p className="ps-product__price">$36.78 – $56.99</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Herschel Leather Duffle Bag In Brown Color
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span>02</span>
                      </div>
                      <p className="ps-product__price">$125.30</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Xbox One Wireless Controller Black Color
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span>02</span>
                      </div>
                      <p className="ps-product__price">$55.30</p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Grand Slam Indoor Of Show Jumping Novel
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span>02</span>
                      </div>
                      <p className="ps-product__price sale">
                        $41.27 <del>$52.99 </del>
                      </p>
                    </div>
                  </div>
                  <div className="ps-product ps-product--wide ps-product--search-result">
                    <div className="ps-product__thumbnail">
                      <Link href="/">
                        <img src="#" alt="" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <a className="ps-product__title" href="h">
                        Sound Intone I65 Earphone White Version
                      </a>
                      <div className="ps-product__rating">
                        <div className="br-wrapper br-theme-fontawesome-stars">
                          <select className="ps-rating" data-read-only="true" style={{ display: "none" }}>
                            <option value={1}>1</option>
                            <option value={1}>2</option>
                            <option value={1}>3</option>
                            <option value={1}>4</option>
                            <option value={2}>5</option>
                          </select>
                          <div className="br-widget br-readonly">
                            <a href="#" data-rating-value={1} data-rating-text={1} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={2} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={3} className="br-selected br-current" />
                            <a href="#" data-rating-value={1} data-rating-text={4} className="br-selected br-current" />
                            <a href="#" data-rating-value={2} data-rating-text={5} />
                            <div className="br-current-rating">1</div>
                          </div>
                        </div>
                        <span>01</span>
                      </div>
                      <p className="ps-product__price sale">
                        $41.27 <del>$62.39 </del>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ps-panel__footer text-center">
                  <a href="https://nouthemes.net/html/martfury/shop-default.html">See all results</a>
                </div>
              </div>
            </form>
          </div>
          <div className="header__right">
            <div className="header__actions">
              <a className="header__extra" href="#">
                {/* <i className="icon-chart-bars" /> */}
                {/* <FontAwesomeIcon icon={faChartBar} /> */}
                <MdInsertChartOutlined />
                <span>
                  <i>0</i>
                </span>
              </a>
              <a className="header__extra" href="#">
                {/* <i className="icon-heart" /> */}
                {/* <FontAwesomeIcon icon={faHeart} /> */}
                <CiHeart />
                <span>
                  <i>0</i>
                </span>
              </a>
              <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                  {/* <i className="icon-bag2" /> */}
                  {/* <FontAwesomeIcon icon={faBagShopping} /> */}
                  <BsBagCheck />
                  <span>
                    <i>{totalUniqueItems ? totalUniqueItems : "0"}</i> {/*** Cart Items here **/}
                  </span>
                </a>
                <CheckoutCart />
              </div>
              <div className="ps-block--user-header">
                <div className="ps-block__left">
                  {/* <i className="icon-user" /> */}
                  <FaRegUser />
                </div>
                <div className="ps-block__right">
                  {
                    session ?
                      <Link href="" onClick={() => signOut()}>Log Out</Link>
                      :
                      <>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavItems />
    </div>
  );
};

export default DesktopHeader;
