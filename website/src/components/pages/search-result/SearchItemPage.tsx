import React, { Fragment, useEffect, useState } from "react";
import SearchSingleItem from "@/components/pages/search-result/SearchSingleItem";
import MobileFilterMapTab from "@/components/pages/search-result/MobileFilterMapTab";
import RelatedCareItem from "@/components/common/RelatedCareItem";
import SearchPageTitlehead from "@/components/pages/search-result/SearchPageTitlehead";
import FilterCommunityTypePopup from "@/components/common/pop-up/filter-community-popup";
import FilterPricePopup from "@/components/common/pop-up/filter-price-popup";
import FilterSizePopup from "@/components/common/pop-up/filter-size-popup";
import FilterAmenitiesPopup from "@/components/common/pop-up/filter-amenities-popup";
import { array } from "yup";
import SvgIcon from "@/components/SvgIcon";
import { useDispatch } from "react-redux";
import { setCareHomeData } from "@/redux/slices";
import { useRouter } from "next/router";
import { formatServiceName } from "@/utils/formatServiceName";

export default function SearchItemPage({
  items,
  chooseMessage,
  onChangeCheckbox,
  onClickClear,
  onChangeRadioButton,
  applyQueryParamToSearch,
}: any) {
  // const [toggleState, setToggleState] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFilterPriceModal, setShowFilterPriceModal] = useState(false);
  const [showFilterSizeModal, setShowFilterSizeModal] = useState(false);
  const [showFilterAmenitiesModal, setShowFilterAmenitiesModal] =
    useState(false);

  const dispatch = useDispatch();

  const route = useRouter();
  const query: any = route.query;

  const onClickCommunityType = async () => {
    setShowFilterModal(true);
  };
  const onClickPriceType = async () => {
    setShowFilterPriceModal(true);
  };
  const onClickSizeType = async () => {
    setShowFilterSizeModal(true);
  };
  const onClickAmenitiesType = async () => {
    setShowFilterAmenitiesModal(true);
  };
  // const toggleTab = ({ index }: { index: any }) => {
  //     setToggleState(index);
  // }

  //const searchItems = props.items
  let msg = "Goodbye";

  const careHomeHover = (e: any, item: any) => {
    dispatch(setCareHomeData({ key: "activeItem", value: item.id }));
  };

  const careHomeUnHover = (e: any, item: any) => {
    dispatch(setCareHomeData({ key: "activeItem", value: null }));
  };

  let filteredPriceString =
    Object.keys(query)?.length && query["price"] > 5000
      ? "More than $5000"
      : `Up to $${query["price"]}`;

  const amenityCount =
    Object.keys(query)?.length && query["amenity"]?.split(",")?.length
      ? query["amenity"]?.split(",")?.length
      : 0;

  const communityType =
    Object.keys(query)?.length && query["care_type"] ? query["care_type"] : "";

  const formattedCommunityName = formatServiceName(communityType);

  const formattedCommunitySizeName = formatServiceName(query["size"]);

  return (
    <>
      <div className="search-item-page">
        <div className="search-page-title-head pc-search-page-title-head">
          <SearchPageTitlehead />
        </div>

          {/*<MobileFilterMapTab */}
          {/*onChangeCheckbox={onChangeCheckbox}*/}
          {/*onClickClear={onClickClear}*/}
          {/*onChangeRadioButton={onChangeRadioButton}*/}
          {/*applyQueryParamToSearch={applyQueryParamToSearch}*/}
          {/*/>*/}


          <div className="tab-main-wrap">
          <div className="tab-btn-wrap sticky-wrap-search-tab">
            <div>
              <button
                className={
                  query["care_type"]
                    ? "tab-item-btn tab-item-btn-active"
                    : "tab-item-btn"
                }
                onClick={() => onClickCommunityType()}
              >
                {Object.keys(query)?.length && query["care_type"]
                  ? formattedCommunityName
                  : "Community type"}
              </button>
              <button
                className={
                  query["price"]
                    ? "tab-item-btn tab-item-btn-active"
                    : "tab-item-btn"
                }
                onClick={() => onClickPriceType()}
              >
                {Object.keys(query)?.length && query["price"]
                  ? filteredPriceString
                  : "Price"}
              </button>
              <button
                className={
                  query["amenity"]
                    ? "tab-item-btn tab-item-btn-active"
                    : "tab-item-btn"
                }
                onClick={() => onClickAmenitiesType()}
              >
                Amenities {amenityCount !== 0 && `(${amenityCount})`}
              </button>
              <button
                className={
                  query["size"]
                    ? "tab-item-btn tab-item-btn-active"
                    : "tab-item-btn"
                }
                onClick={() => onClickSizeType()}
              >
                {Object.keys(query)?.length && query["size"]
                  ? formattedCommunitySizeName
                  : "Size"}
              </button>
            </div>
            <button
              className="primary-text-btn"
              onClick={() => onClickClear({})}
            >
              Clear All
            </button>
          </div>
          {items?.length > 0 ? (
            items.map((item: any) => {
              return (
                <div
                  key={item.id}
                  onMouseEnter={(e) => {
                    careHomeHover(e, item);
                  }}
                  onMouseLeave={(e) => {
                    careHomeUnHover(e, item);
                  }}
                >
                  <SearchSingleItem
                    item={item}
                    onClick={() => chooseMessage(item)}
                  />
                </div>
              );
            })
          ) : (
            <div className="no-result-found title-large">
              No Result Found...!
            </div>
          )}
          {/*<SearchSingleItem />*/}
        </div>
      </div>
      <FilterCommunityTypePopup
        onClickClear={onClickClear}
        showModal={showFilterModal}
        setShowModal={setShowFilterModal}
        onChangeCheckbox={onChangeRadioButton}
        applyQueryParamToSearch={() => {
          setShowFilterModal(false);
          applyQueryParamToSearch();
        }}
      />
      <FilterPricePopup
        onClickClear={onClickClear}
        showModal={showFilterPriceModal}
        setShowModal={setShowFilterPriceModal}
        onChangeRadioButton={onChangeRadioButton}
        applyQueryParamToSearch={() => {
          setShowFilterPriceModal(false);
          applyQueryParamToSearch();
        }}
      />
      <FilterSizePopup
        onClickClear={onClickClear}
        showModal={showFilterSizeModal}
        setShowModal={setShowFilterSizeModal}
        onChangeRadioButton={onChangeRadioButton}
        applyQueryParamToSearch={() => {
          setShowFilterSizeModal(false);
          applyQueryParamToSearch();
        }}
      />
      <FilterAmenitiesPopup
        onClickClear={onClickClear}
        showModal={showFilterAmenitiesModal}
        setShowModal={setShowFilterAmenitiesModal}
        onChangeCheckbox={onChangeCheckbox}
        applyQueryParamToSearch={() => {
          setShowFilterAmenitiesModal(false);
          applyQueryParamToSearch();
        }}
      />
    </>
  );
}
