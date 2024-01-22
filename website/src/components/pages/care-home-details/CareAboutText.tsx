import React, { useState } from "react";
import Image from "next/image";
import avatar from "@/components/common/assets/avatar.svg";

export default function CareAboutText({ observerRefs, _ref, singleCareHome }: any) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleReadMore = (e) => {
    e.preventDefault();
    setShowFullText(!showFullText);
  };

  return (
    <div className="care-about-text-wrap" id="about-section" ref={_ref}>
      <h1 className="headline-large">About the {singleCareHome?.data?.name}</h1>
      <div className="care-about-des">

        {!showFullText && <p dangerouslySetInnerHTML={{ __html: singleCareHome?.data?.short_desc?.slice(0, 400) }}></p>}
        {showFullText && <p dangerouslySetInnerHTML={{ __html: singleCareHome?.data?.desc }}></p>}

      </div>
      {!!(singleCareHome?.data?.desc?.length > 399) && <button className="primary-text-btn"
        onClick={toggleReadMore}>
        {`${showFullText ? 'Learn Less' : 'Learn More'}`}
      </button>}
      {/* <button className="primary-text-btn">Learn More</button> */}
    </div>
  );
}
