import SvgIcon from "@/components/SvgIcon";
import React, { useState } from "react";
import SearchPopup from "@/components/common/pop-up/search-popup";

export default function MobileSearchTop() {
  const [showModal, setShowModal] = useState(false);

  const onClickSearch = async () => {
    setShowModal(true);
  };
  return (
    <div className="mobile-search-top-wrap">
      <button onClick={() => onClickSearch()}>
        <SvgIcon name="search_primary" className={"search_primary"} />
      </button>
      <SearchPopup showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
