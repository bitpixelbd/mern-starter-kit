import SimpleImageSlider from "react-simple-image-slider";
import PerfectMatchBtn from "@/components/common/PerfectMatchBtn";

export default function RelatedCareItemSlider() {
    const images = [
        { url: "https://webkit.org/demos/srcset/image-src.png" },
        { url: "https://webkit.org/demos/srcset/image-2x.png" },
        { url: "https://webkit.org/demos/srcset/image-src.png" },
        { url: "https://webkit.org/demos/srcset/image-2x.png" },
        { url: "https://webkit.org/demos/srcset/image-src.png" },
    ];
  return (
      <div className="related-care-single-slider">
          <SimpleImageSlider
              width={896}
              height={504}
              images={images}
              showBullets={true}
              showNavs={true}
              loop={false}
          />
      </div>
  );
}
