import ReactPaginate from "react-paginate";

const UniversalPaginate = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel="« prev"
      nextLabel="next »"
      breakLabel="..."
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName="flex justify-center items-center gap-2 mt-6"
      pageClassName="btn btn-sm btn-outline"
      previousClassName="btn btn-sm btn-outline"
      nextClassName="btn btn-sm btn-outline"
      breakClassName="btn btn-sm btn-ghost"
      activeClassName="btn-primary" // active page styling
      disabledClassName="btn-disabled opacity-50 cursor-not-allowed"
    />
  );
};

export default UniversalPaginate;
