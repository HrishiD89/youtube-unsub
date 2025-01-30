/* eslint-disable react/prop-types */
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

const Pagination = ({ currentPage, totalPages, onPageChange,width }) => {
  let maxVisiblePages = 1;

  if(width > 640) maxVisiblePages = 3;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);


  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) return pages;

    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      ),
      1
    );
    const end = Math.min(start + maxVisiblePages - 1, totalPages);

    return pages.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    // <div className="sm:flex items-center justify-center space-x-2 hidden">
    <div className="flex items-center justify-center space-x-2 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-2 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50"
      >
        <GrCaretPrevious />
      </button>
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? "bg-red-600 text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-700"
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-2 rounded-md bg-white border border-gray-300 text-gray-700 disabled:opacity-50"
      >
        <GrCaretNext  />
      </button>
    </div>
  );
};

export default Pagination;
