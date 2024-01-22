import Link from "next/link";
import React from "react";

const DownloadAppImgSection = () => {
  return (
    <div className="ps-download-app" style={{marginTop:"50px"}}>
      <div className="ps-container">
        <div className="ps-block--download-app">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block__thumbnail">
                  <img src="https://nouthemes.net/html/martfury/img/app.png" alt="" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block__content">
                  <h3>Download Martfury App Now!</h3>
                  <p>Shopping fastly and easily more with our app. Get a link to download the app on your phone</p>
                  <form className="ps-form--download-app" method="post">
                    <div className="form-group--nest">
                      <input className="form-control" type="Email" placeholder="Email Address" />
                      <button className="ps-btn">Subscribe</button>
                    </div>
                  </form>
                  <p className="download-link">
                    <Link href="#">
                      <img src="https://nouthemes.net/html/martfury/img/google-play.png" alt="" />
                    </Link>
                    <Link href="#">
                      <img src="https://nouthemes.net/html/martfury/img/app-store.png" alt="" />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppImgSection;
