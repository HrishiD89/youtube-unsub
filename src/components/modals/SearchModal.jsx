/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";

const SearchModal = ({ onClick, data, handleToggleChannel, selectedIds }) => {
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filterSubs = useMemo(() => {
    return data.filter((item) => {
      return item.snippet.title
        .toLowerCase()
        .includes(debouncedQuery.toLowerCase().trim());
    });
  }, [debouncedQuery, data]);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div className="bg-black/60 fixed top-0 left-0 right-0 bottom-0 z-[99] px-4 sm:px-0">
      <div className="max-w-2xl w-full bg-gray-900 rounded-md overflow-hidden max-h-96 mx-auto  mt-64 sm:mt-40">
        <div className="bg-gray-800 flex items-center w-full justify-center px-3 gap-3">
          <span className="p-1">
            <CiSearch className="w-6 h-6" />
          </span>
          <input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            ref={searchRef}
            type="text"
            placeholder="Search channels..."
            className="p-3 w-full cursor-pointer bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <span className="p-1 cursor-pointer group" onClick={onClick}>
            <IoCloseCircle className="w-6 h-6 hover:text-red-500 text-gray-400" />
          </span>
          
        </div>
        <div className="overflow-y-auto max-h-screen">
          {filterSubs.length > 0 ? (
            <div>
              {filterSubs.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`  flex relative items-center p-3 gap-3  hover:bg-gray-400/20 cursor-pointer justify-between`}
                  >
                    <div
                      onClick={() => handleToggleChannel(item.id)}
                      className="flex items-center gap-3 w-full"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.snippet.thumbnails.default.url}
                        alt={item.title}
                      />
                      <div>
                        <p>{item.snippet.title}</p>
                        <p className="text-gray-400 text-sm">
                          {item.details.snippet.customUrl}
                        </p>
                      </div>
                    </div>
                    <span className="text-red-500 bg-red-400/20 px-2  rounded-full hover:bg-gray-400/20 ">
                      {selectedIds.has(item.id) ? 1 : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
