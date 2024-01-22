import Link from "next/link";

const BannerSection = () => {
  const sliderImage = "https://edit.org/photos/img/blog/mbp-template-banner-online-store-free.jpg-840.jpg";
  return (
    <div className="ps-home-banner ps-home-banner--1">
      <div className="ps-container">
        <div className="ps-section__left">
          <div
            className="ps-carousel--nav-inside owl-slider owl-carousel owl-loaded owl-drag"
            data-owl-auto="true"
            data-owl-loop="true"
            data-owl-speed="5000"
            data-owl-gap="0"
            data-owl-nav="true"
            data-owl-dots="true"
            data-owl-item="1"
            data-owl-item-xs="1"
            data-owl-item-sm="1"
            data-owl-item-md="1"
            data-owl-item-lg="1"
            data-owl-duration="1000"
            data-owl-mousedrag="on"
            data-owl-animate-in="fadeIn"
            data-owl-animate-out="fadeOut"
          >
            <div className="owl-stage-outer">
              <div
                className="owl-stage"
                style={{
                  transform: "translate3d(-4800px, 0px, 0px)",
                  transition: "all 0s ease 0s",
                  width: "8400px",
                }}
              >
                <div className="owl-item cloned" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item cloned" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item animated owl-animated-in fadeIn active" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background="img/slider/home-1/slide-3.jpg" style={{ background: 'url("img/slider/home-1/slide-3.jpg")' }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item cloned" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
                <div className="owl-item cloned" style={{ width: "1200px" }}>
                  <div className="ps-banner bg--cover" data-background={sliderImage} style={{ background: `url("${sliderImage}")` }}>
                    <Link className="ps-banner__overlay" href="#" />
                  </div>
                </div>
              </div>
            </div>
            <div className="owl-nav">
              <button type="button" role="presentation" className="owl-prev">
                <i className="icon-chevron-left" />
              </button>
              <button type="button" role="presentation" className="owl-next">
                <i className="icon-chevron-right" />
              </button>
            </div>
            <div className="owl-dots">
              <button role="button" className="owl-dot">
                <span />
              </button>
              <button role="button" className="owl-dot">
                <span />
              </button>
              <button role="button" className="owl-dot active">
                <span />
              </button>
            </div>
          </div>
        </div>
        <div className="ps-section__right">
          <Link className="ps-collection" href="#">
            <img src={sliderImage} alt="" />
          </Link>
          <Link className="ps-collection" href="#">
            <img src={sliderImage} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
