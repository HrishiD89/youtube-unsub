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
}) => {
  return (
    <div className="bg-black sm:px-4 flex gap-3 flex-col sticky left-0 right-0 sm:top-16 max-w-7xl mx-auto z-[45] py-4">
      <div className="flex items-center justify-between md:flex-row flex-col">
        <div className="text-3xl font-bold py-2 flex">
          <a
            href="https://www.youtube.com/feed/channels"
            target="_blank"
            rel="noreferrer"
          >
            Total subscriptions
          </a>
          <span className="text-red-500 text-sm"> ({totalSubscriptions})</span>
        </div>

        {selectedCount >= 0 && (
          <div className="flex justify-between w-full md:w-auto flex-col-reverse sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex flex-shrink-0 items-center bg-gray-800 hover:bg-gray-700 rounded-md">
              <span className="p-2">
                <CiSearch className="w-8 h-8" />
              </span>
              <input
                type="text"
                value={""}
                placeholder="Search channels"
                onClick={handleSearchClick}
                readOnly
                className="cursor-pointer outline-none py-2 bg-gray-800 hover:bg-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-between sm:justify-end">
              {/* Unsubscribe Button */}
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

              {/* Subscriptions Button */}
              <button
                onClick={toggleUnSubModal}
                aria-label="Subscriptions"
                className="px-3 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center relative"
              >
                <MdSubscriptions className="text-white-500 w-5 h-5" />
                <span className="text-red-500 bg-white absolute -top-2 -right-2 px-2 rounded-full font-bold">
                  {selectedCount}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="py-1">
        {isLoading ? (
          <div className="p-4">
            <div className="animate-pulse">
              <div className="flex gap-3 justify-center items-end">
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
                <span className="px-2 text-2xl">...</span>
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
                <span className="w-8 h-8 bg-gray-300 rounded"></span>
              </div>
            </div>
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};