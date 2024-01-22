import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SizeContent from "@/components/common/pop-up/component/filter/SizeContent";
import FilterPopupFooter from "@/components/common/pop-up/component/filter/FilterPopupFooter";
import { useRouter } from "next/router";

export default function FilterSizePopup({
  showModal,
  setShowModal,
  onChangeRadioButton,
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
            <h1 className="headline-medium">Filter by community size</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="expert-popup-inner filter-step-wrapper">
              <div className="middle-content-main">
                <SizeContent
                  onChangeRadioButton={onChangeRadioButton}
                  queryParam={query}
                  queryString={"size"}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <FilterPopupFooter
              filterBy={"size"}
              onClickClear={onClickClear}
              applyQueryParamToSearch={applyQueryParamToSearch}
            />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
