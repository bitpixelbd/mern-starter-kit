import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import PriceContent from "@/components/common/pop-up/component/filter/PriceContent";
import FilterPopupFooter from "@/components/common/pop-up/component/filter/FilterPopupFooter";
import { useRouter } from "next/router";

export default function FilterPricePopup({
  showModal,
  setShowModal,
  onClickClear,
  onChangeRadioButton,
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
            <h1 className="headline-medium">Filter by prices</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="expert-popup-inner filter-step-wrapper">
              <div className="middle-content-main">
                <PriceContent
                  onChangeRadioButton={onChangeRadioButton}
                  queryParam={query}
                  queryString={"price"}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <FilterPopupFooter
              filterBy={"price"}
              onClickClear={onClickClear}
              applyQueryParamToSearch={applyQueryParamToSearch}
            />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
