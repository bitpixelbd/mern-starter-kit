import { IoIosMenu } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

const NavItems = () => {
  return (
    <div>
      <nav className="navigation">
        <div className="ps-container">
          <div className="navigation__left">
            <div className="menu--product-categories">
              <div className="menu__toggle">
                {/* <i className="icon-menu" /> */}
                <IoIosMenu style={{ fontSize: "30px" }} />
                <span> Shop by Department</span>
              </div>
              <div className="menu__content">
                <ul className="menu--dropdown">
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
                </ul>
              </div>
            </div>
          </div>
          <div className="navigation__right">
            <ul className="menu">
              <li className="menu-item-has-children">
                <a href="">Home</a>
                <FaChevronDown />
                <span className="sub-toggle" />
                <ul className="sub-menu">
                  <li>
                    <a href="">Marketplace Full Width</a>
                  </li>
                  <li>
                    <a href="">Home Auto Parts</a>
                  </li>
                  <li>
                    <a href="">Home Technology</a>
                  </li>
                  <li>
                    <a href="">Home Organic</a>
                  </li>
                  <li>
                    <a href="">Home Marketplace V1</a>
                  </li>
                  <li>
                    <a href="">Home Marketplace V2</a>
                  </li>
                  <li>
                    <a href="">Home Marketplace V3</a>
                  </li>
                  <li>
                    <a href="">Home Marketplace V4</a>
                  </li>
                  <li>
                    <a href="">Home Electronic</a>
                  </li>
                  <li>
                    <a href="">Home Furniture</a>
                  </li>
                  <li>
                    <a href="">Home Kids</a>
                  </li>
                  <li>
                    <a href="">Home photo and picture</a>
                  </li>
                  <li>
                    <a href="">Home Medical</a>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children has-mega-menu">
                <a href="">Shop</a>
                <FaChevronDown />
                <span className="sub-toggle" />
                <div className="mega-menu">
                  <div className="mega-menu__column">
                    <h4>
                      Catalog Pages
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-default.html">Shop Default</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-default.html">Shop Fullwidth</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-categories.html">Shop Categories</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-sidebar.html">Shop Sidebar</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-sidebar-without-banner.html">Shop Without Banner</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/shop-carousel.html">Shop Carousel</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column">
                    <h4>
                      Product Layout
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="h">Default</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-extend.html">Extended</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-full-content.html">Full Content</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-box.html">Boxed</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-sidebar.html">Sidebar</a>
                      </li>
                      <li>
                        <a href="h">Fullwidth</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column">
                    <h4>
                      Product Types
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="h">Simple</a>
                      </li>
                      <li>
                        <a href="h">Color Swatches</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-image-swatches.html">Images Swatches</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-countdown.html">Countdown</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-multi-vendor.html">Multi-Vendor</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-instagram.html">Instagram</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-affiliate.html">Affiliate</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-on-sale.html">On sale</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-video.html">Video Featured</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-groupped.html">Grouped</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/product-out-stock.html">Out Of Stock</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column">
                    <h4>
                      Woo Pages
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="">Shopping Cart</a>
                      </li>
                      <li>
                        <a href="">Checkout</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/whishlist.html">Whishlist</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/compare.html">Compare</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/order-tracking.html">Order Tracking</a>
                      </li>
                      <li>
                        <a href="">My Account</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="menu-item-has-children has-mega-menu">
                <a href="">Pages</a>
                <FaChevronDown />
                <span className="sub-toggle" />
                <div className="mega-menu">
                  <div className="mega-menu__column">
                    <h4>
                      Basic Page
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="https://nouthemes.net/html/martfury/about-us.html">About Us</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/contact-us.html">Contact</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/faqs.html">Faqs</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/comming-soon.html">Comming Soon</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/404-page.html">404 Page</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column">
                    <h4>
                      Vendor Pages
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="https://nouthemes.net/html/martfury/become-a-vendor.html">Become a Vendor</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/vendor-store.html">Vendor Store</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/vendor-dashboard-free.html">Vendor Dashboard Free</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/vendor-dashboard-pro.html">Vendor Dashboard Pro</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="menu-item-has-children has-mega-menu">
                <a href="">Blogs</a>
                <FaChevronDown />
                <span className="sub-toggle" />
                <div className="mega-menu">
                  <div className="mega-menu__column">
                    <h4>
                      Blog Layout
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-grid.html">Grid</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-list.html">Listing</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-small-thumb.html">Small Thumb</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-left-sidebar.html">Left Sidebar</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-right-sidebar.html">Right Sidebar</a>
                      </li>
                    </ul>
                  </div>
                  <div className="mega-menu__column">
                    <h4>
                      Single Blog
                      <span className="sub-toggle" />
                    </h4>
                    <ul className="mega-menu__list">
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-detail.html">Single 1</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-detail-2.html">Single 2</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-detail-3.html">Single 3</a>
                      </li>
                      <li>
                        <a href="https://nouthemes.net/html/martfury/blog-detail-4.html">Single 4</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="navigation__extra">
              <li>
                <a href="#">Sell on Martfury</a>
              </li>
              <li>
                <a href="#">Tract your order</a>
              </li>
              <li>
                <div className="ps-dropdown d-flex align-items-center">
                  <a href="#">US Dollar</a>
                  <FaChevronDown />
                  <ul className="ps-dropdown-menu">
                    <li>
                      <a href="#">Us Dollar</a>
                    </li>
                    <li>
                      <a href="#">Euro</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <div className="ps-dropdown language">
                  <a href="#">
                    <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/en.png" alt="" />
                    English <FaChevronDown />
                  </a>
                  <ul className="ps-dropdown-menu">
                    <li>
                      <a href="#">
                        <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/germany.png" alt="" /> Germany
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/fr.png" alt="" /> France
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavItems;
