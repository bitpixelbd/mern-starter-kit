import React from "react";

const ReviewsProducts = () => {
  return (
    <div className="tab-content border border-top-0 p-2">
      <div className="tab-pane fade" id="waiting-tab-pane" role="tabpanel" aria-labelledby="waiting-tab" tabIndex={0}>
        <div className="alert alert-info">
          <span>You do not have any products to review yet. Just shopping!</span>
        </div>
      </div>
      <div className="tab-pane fade active show" id="reviewed-tab-pane" role="tabpanel" aria-labelledby="reviewed-tab" tabIndex={0}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Date</th>
                <th>Star</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <img src="./Product Reviews_files/12-150x150.jpg" alt="EPSION Plaster Printer" className="img-thumb page_speed_1315285709" />
                </th>
                <th scope="row">
                  <a href="https://martfury.botble.com/products/epsion-plaster-printer">EPSION Plaster Printer</a>
                  <p>
                    <small>(SW-199-A0)</small>
                  </p>
                  <p className="d-block mb-0 sold-by">
                    <small>
                      Sold by:{" "}
                      <a href="https://martfury.botble.com/stores/global-office" className="text-primary">
                        Global Office
                      </a>
                    </small>
                  </p>
                </th>
                <td>Dec 03, 2023 06:12</td>
                <td>
                  <span>5</span>
                  <span className="ecommerce-icon text-primary">
                    <span className="icon-tabler-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star"
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
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                      </svg>
                    </span>
                  </span>
                </td>
                <td>
                  <span title="As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it's built on fully WordPress concept.">
                    As a developer I reviewed this script. This is really awesome ecommerce script. I have convinced when I noticed that it'...
                  </span>
                </td>
                <td>
                  <form>
                    <input name="_token" type="hidden" defaultValue="UZQ1a3WLDeddu80K8z056mxuj3qhCseXqyzt6zxw" />
                    <input name="_method" type="hidden" defaultValue="DELETE" />
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </form>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <img src="./Product Reviews_files/19-150x150.jpg" alt="NYX Beauty Couton Pallete Makeup 12" className="img-thumb page_speed_1315285709" />
                </th>
                <th scope="row">
                  <a href="https://martfury.botble.com/products/nyx-beauty-couton-pallete-makeup-12">NYX Beauty Couton Pallete Makeup 12</a>
                  <p>
                    <small>(SW-163-A0)</small>
                  </p>
                  <p className="d-block mb-0 sold-by">
                    <small>
                      Sold by:{" "}
                      <a href="https://martfury.botble.com/stores/global-office" className="text-primary">
                        Global Office
                      </a>
                    </small>
                  </p>
                </th>
                <td>Dec 03, 2023 06:12</td>
                <td>
                  <span>3</span>
                  <span className="ecommerce-icon text-primary">
                    <span className="icon-tabler-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-star"
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
                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                      </svg>
                    </span>
                  </span>
                </td>
                <td>
                  <span title="Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecanyon.net, I buy a lot of templates, and everyone will have a response from technical support for two or three days. Thanks to tech support. I recommend to buy.">
                    Cool template. Excellent code quality. The support responds very quickly, which is very rare on themeforest and codecany...
                  </span>
                </td>
                <td>
                  <form>
                    <input name="_token" type="hidden" defaultValue="UZQ1a3WLDeddu80K8z056mxuj3qhCseXqyzt6zxw" />
                    <input name="_method" type="hidden" defaultValue="DELETE" />
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <nav>
            <ul className="pagination">
              <li className="page-item disabled" aria-disabled="true" aria-label="« Previous">
                <span className="page-link" aria-hidden="true">
                  ‹
                </span>
              </li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">1</span>
              </li>
              <li className="page-item">
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link" rel="next" aria-label="Next »">
                  ›
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      d
    </div>
  );
};

export default ReviewsProducts;
