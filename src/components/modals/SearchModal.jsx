/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";
import { motion } from "motion/react";
import { IoMdClose } from "react-icons/io";

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
    <div  className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] px-4 sm:px-0">
      <motion.div
        key="searchModal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full bg-gray-900 rounded-md overflow-hidden max-h-96 mx-auto mt-40"
      >
        <div className="bg-gray-800 flex items-center w-full justify-end px-3 py-2 gap-3">
          <motion.span
            whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer group"
            onClick={onClick}
          >
            <IoMdClose className="w-6 h-6 text-gray-400 hover:text-red-500" />
          </motion.span>
        </div>
        <div className="bg-gray-900 flex items-center w-full justify-center px-3 gap-3 border-b border-gray-800">
          <span className="p-1">
            <CiSearch className="w-6 h-6" />
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchRef}
            type="text"
            placeholder="Search channels..."
            className="p-3 w-full cursor-pointer bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
          />
          {searchQuery.length > 0 && (
            <motion.span
              whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer group"
              onClick={() => setSearchQuery("")}
            >
              <IoCloseCircle className="w-6 h-6 text-gray-400" />
            </motion.span>
          )}
        </div>
        <div id="searchModal"  className="overflow-y-auto max-h-screen">
          {filterSubs.length > 0 ? (
            <div>
              {filterSubs.map((item) => (
                <div
                  key={item.id}
                  className="flex relative items-center py-3 px-4 gap-3 hover:bg-gray-400/20 cursor-pointer justify-between"
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
                  <span className="text-red-500 bg-red-400/20 px-2 rounded-full hover:bg-gray-400/20">
                    {selectedIds.has(item.id) ? 1 : ""}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3">No results found</div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchModal;
