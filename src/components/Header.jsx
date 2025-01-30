import { CiSearch } from "react-icons/ci";
import Pagination from "./Pagination";
import { MdSubscriptions } from "react-icons/md";

/* eslint-disable react/prop-types */
export const Header = ({
  totalSubscriptions,
  selectedCount,
  currentPage,
  totalPages,
  onPageChange,
  handleSearchClick,
  handleToggleUnsuscribe,
  isUnsubscribing,
  toggleUnSubModal,
  isLoading,
  width,
}) => {
  return (
    <div className="bg-black px-4 flex flex-col gap-3 sticky left-0 right-0 top-16  z-[45] py-4 overflow-hidden max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-3">
          <a
            href="https://www.youtube.com/feed/channels"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 sm:py-3"
          >
            <span className="text-red-500 p-2 text-xs bg-red-400/20 rounded-full">
              {totalSubscriptions}
            </span>
            <span className="text-2xl">Subscriptions</span>
          </a>
        </div>

        {/* Mobile Unsubscribe Button */}
        <div className="block sm:hidden">
          <button
            onClick={handleToggleUnsuscribe}
            disabled={selectedCount === 0}
            aria-label="Unsubscribe"
            className={`bg-red-500 text-white px-4 py-3 rounded-md flex items-center justify-center hover:bg-red-800 transition ${
              selectedCount === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUnsubscribing && (
              <span>
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.982 7.982 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.847z"
                  />
                </svg>
              </span>
            )}
            Unsubscribe
          </button>
        </div>
      </div>

      {/* Mobile Search and Subscriptions Button */}
      <div className="flex sm:hidden justify-between gap-3 w-full">
        {/* Search Input */}
        <div className="flex flex-grow items-center bg-gray-800 rounded-md overflow-hidden">
          <span className="p-2">
            <CiSearch className="w-6 h-6 text-gray-400" />
          </span>
          <input
            type="text"
            value={""}
            placeholder="Search channels"
            onClick={handleSearchClick}
            readOnly
            className="cursor-pointer outline-none py-3 bg-gray-800 w-full text-white placeholder-gray-400"
          />
        </div>

        {/* Subscriptions Button */}
        <button
          onClick={toggleUnSubModal}
          aria-label="Subscriptions"
          className="px-3 py-3 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center relative"
        >
          <MdSubscriptions className="text-white w-5 h-5" />
          <span className="text-red-500 bg-white absolute -top-2 -right-2 px-2 rounded-full font-bold">
            {selectedCount}
          </span>
        </button>
      </div>

      {/* Desktop Search, Unsubscribe, and Subscriptions Buttons */}
      <div className="hidden sm:flex justify-between items-center gap-4 w-full">
        {/* Search Input */}
        <div className="flex flex-grow items-center bg-gray-800 rounded-md overflow-hidden">
          <span className="p-2">
            <CiSearch className="w-6 h-6 text-gray-400" />
          </span>
          <input
            type="text"
            value={""}
            placeholder="Search channels"
            onClick={handleSearchClick}
            readOnly
            className="cursor-pointer outline-none py-3 bg-gray-800 w-full text-white placeholder-gray-400"
          />
        </div>

        {/* Unsubscribe and Subscriptions Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleToggleUnsuscribe}
            disabled={selectedCount === 0}
            aria-label="Unsubscribe"
            className={`bg-red-500 text-white px-8 py-3 rounded-md flex items-center justify-center hover:bg-red-800 transition ${
              selectedCount === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUnsubscribing && (
              <span>
                <svg
                  className="animate-spin h-5 w-5 mr-3 inline"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.982 7.982 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.847z"
                  />
                </svg>
              </span>
            )}
            Unsubscribe
          </button>

          <button
            onClick={toggleUnSubModal}
            aria-label="Subscriptions"
            className="px-3 py-3 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center relative"
          >
            <MdSubscriptions className="text-white w-5 h-5" />
            <span className="text-red-500 bg-white absolute -top-2 -right-2 px-2 rounded-full font-bold">
              {selectedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="py-1">
        {isLoading ? (
          <div className="p-4">
            <div className="animate-pulse">
              <div className="flex gap-3 justify-center items-end">
                {[...Array(7)].map((_, index) => (
                  <span
                    key={index}
                    className="w-8 h-8 bg-gray-300 rounded"
                  ></span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Pagination
            width={width}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};
