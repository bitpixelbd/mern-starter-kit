"use client";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const { data: session } = useSession()
  const userRole = "customer";
  const pathName = usePathname();

  const vendorItems = [
    { id: 10, name: "Become a vendor", path: "/dashboard/vendor-dashboard", icon: "icon-cart" },
    // { id: 11, name: "Log Out", icon: "icon-power-switch" },
  ];
  const userItems = [
    { id: 10, name: "Become A Vendor", path: "/dashboard/become-vendor", icon: "icon-lock" },
    // { id: 11, name: "Log Out", icon: "icon-power-switch" },
  ];

  const sidebarItems = [
    { id: 1, name: "Profile", path: "/dashboard", icon: "icon-pencil" },
    { id: 1, name: "Update Profile", path: "/dashboard/edit-account", icon: "icon-pencil" },
    { id: 4, name: "Orders", path: "/dashboard/orders", icon: "icon-papers" },
    { id: 5, name: "Downloads", path: "/dashboard/downloads", icon: "icon-papers" },
    { id: 6, name: "Product reviews", path: "/dashboard/product-reviews", icon: "icon-star" },
    { id: 7, name: "Order return requests", path: "/dashboard/return-order", icon: "icon-cart-remove" },
    { id: 8, name: "Address", path: "/dashboard/address", icon: "icon-map-marker" },
    { id: 9, name: "Change Password", path: "/dashboard/change-password", icon: "icon-lock" },
  ];

  if (userRole === "customer") {
    sidebarItems.push(...userItems);
  } else if (userRole === "vendor") {
    sidebarItems.push(...vendorItems);
  }

  return (
    <div className="col-lg-4">
      <div className="ps-section__left">
        <aside className="ps-widget--account-dashboard">
          <div className="ps-widget__header">
            <form id="avatar-upload-form" encType="multipart/form-data" action="javascript:void(0)" onsubmit="return false">
              <div className="avatar-upload-container">
                <div id="account-avatar">
                  <div className="profile-image">
                    <div className="avatar-view mt-card-avatar">
                      <img className="br2" src="./Account information_files/logo-150x150.png" alt="Yoko House" />
                      <div className="mt-overlay br2">
                        <span>
                          <i className="fa fa-edit" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <figure>
              <figcaption>Hello</figcaption>
              <p>{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </figure>
          </div>
          <div className="ps-widget__content">
            <ul>
              {/* <li className="active">
                <a href="https://martfury.botble.com/customer/overview">
                  <i className="icon-user" /> Account Information
                </a>
              </li> */}

              {sidebarItems?.map((item) => (
                <li className={`${item?.path === pathName ? "active" : ""}`} key={item?.id}>
                  <Link href={item?.path}>
                    <i className={item?.icon} /> <span>{item?.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button className="dashboard-logout-button">Log out</button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardSidebar;
