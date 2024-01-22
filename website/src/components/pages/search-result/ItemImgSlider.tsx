import SimpleImageSlider from "react-simple-image-slider";
export default function ItemImgSlider() {
    const images = [
        { url: "https://webkit.org/demos/srcset/image-src.png" },
        { url: "https://webkit.org/demos/srcset/image-2x.png" },
        { url: "https://webkit.org/demos/srcset/image-src.png" },
        { url: "https://webkit.org/demos/srcset/image-2x.png" },
        { url: "https://webkit.org/demos/srcset/image-src.png" },
    ];
  return (
    <>
        <SimpleImageSlider
            width={896}
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
            loop={false}
        />
    </>
  );
}
