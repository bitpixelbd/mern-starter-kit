import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import AmenitiesContent from "@/components/common/pop-up/component/filter/AmenitiesContent";
import FilterPopupFooter from "@/components/common/pop-up/component/filter/FilterPopupFooter";
import { useRouter } from "next/router";

export default function FilterAmenitiesPopup({
  showModal,
  setShowModal,
  onChangeCheckbox,
  onClickClear,
  applyQueryParamToSearch,
}: any) {
  const route = useRouter();
  const query: any = route.query;
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="main-popup-wrapper medium-width-popup">
          <Modal.Header closeButton>
            <h1 className="headline-medium">Filter by amenities</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="expert-popup-inner filter-step-wrapper">
              <div className="middle-content-main">
                <AmenitiesContent
                  onChangeCheckbox={onChangeCheckbox}
                  queryParam={query}
                  queryString={"amenity"}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <FilterPopupFooter
              filterBy={"amenity"}
              onClickClear={onClickClear}
              applyQueryParamToSearch={applyQueryParamToSearch}
            />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
