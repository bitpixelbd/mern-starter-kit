import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CommunityTypeContent from "@/components/common/pop-up/component/filter/CommunityTypeContent";
import FilterPopupFooter from "@/components/common/pop-up/component/filter/FilterPopupFooter";
import { useRouter } from "next/router";

export default function FilterCommunityTypePopup({
  showModal,
  setShowModal,
  onClickClear,
  onChangeCheckbox,
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
            <h1 className="headline-medium">Filter by community types</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="expert-popup-inner filter-step-wrapper">
              <div className="middle-content-main">
                <CommunityTypeContent
                  onChangeCheckbox={onChangeCheckbox}
                  queryParam={query}
                  queryString={"care_type"}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <FilterPopupFooter
              filterBy={"care_type"}
              onClickClear={onClickClear}
              applyQueryParamToSearch={applyQueryParamToSearch}
            />
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
