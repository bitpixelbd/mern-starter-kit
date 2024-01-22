import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function SearchPagination({
  itemsPerPage,
  items,
  pageCount,
  onClickPage,
}: any) {
  const handlePageClick = (event: any) => {
    onClickPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      marginPagesDisplayed={0}
      pageCount={pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}

export default SearchPagination;
