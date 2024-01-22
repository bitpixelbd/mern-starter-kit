import React from "react";

const AddressCart = () => {
  return (
    <div className="dashboard-address">
      <div className="row row-cols-md-2 row-cols-1 gx-2 mb-3">
        <div className="col mt-3">
          <div className="card mb-3 p-3">
            <p>
              {" "}
              Shawn Johnston <span className="badge bg-info text-info-fg">Default</span>
            </p>
            <p>
              <span className="icon-tabler-wrapper me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-book"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6l0 13" />
                  <path d="M12 6l0 13" />
                  <path d="M21 6l0 13" />
                </svg>
              </span>{" "}
              690 Serenity Locks, Amiyaport, Massachusetts, PR
            </p>
            <p>
              <span className="icon-tabler-wrapper me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                </svg>
              </span>
              +15207248158
            </p>
            <p className="mt-3 text-end mb-0">
              <a className="text-info" href="https://martfury.botble.com/customer/address/edit/1">
                Edit
              </a>
              |{" "}
              <a className="text-danger btn-trigger-delete-address" data-url="https://martfury.botble.com/customer/address/delete/1" href="https://martfury.botble.com/customer/address#">
                Remove
              </a>
            </p>
          </div>
        </div>
        <div className="col mt-3">
          <div className="card mb-3 p-3">
            <p> Shawn Johnston </p>
            <p>
              <span className="icon-tabler-wrapper me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-book"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                  <path d="M3 6l0 13" />
                  <path d="M12 6l0 13" />
                  <path d="M21 6l0 13" />
                </svg>
              </span>{" "}
              680 Schimmel Expressway, Donnytown, New Jersey, BO
            </p>
            <p>
              <span className="icon-tabler-wrapper me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                </svg>
              </span>
              +16787635807
            </p>
            <p className="mt-3 text-end mb-0">
              <a className="text-info" href="https://martfury.botble.com/customer/address/edit/2">
                Edit
              </a>
              |{" "}
              <a className="text-danger btn-trigger-delete-address" data-url="https://martfury.botble.com/customer/address/delete/2" href="https://martfury.botble.com/customer/address#">
                Remove
              </a>
            </p>
          </div>
        </div>
      </div>
      <button className="reviews-active-button">
        <span className="icon-tabler-wrapper me-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </span>
        <span>Add a new address</span>
      </button>
    </div>
  );
};

export default AddressCart;
