/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import DataListItem from "../DataListItem";
import { motion } from "framer-motion";

const UnsubscribeListModal = ({
  data,
  selectedIds,
  handleToggleChannel,
  toggleUnSubModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] px-4 sm:px-0">
      <motion.div
        key="searchModal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-gray-900 rounded-md overflow-hidden mx-auto mt-64 sm:mt-40"
      >
        <div className="overflow-y-auto max-h-screen">
          <div className="bg-gray-800 flex items-center w-full justify-between px-3 py-2 gap-3">
            <span className="text-sm text-gray-400">Selected Channels</span>
            <motion.span
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer group"
              onClick={toggleUnSubModal}
            >
              <IoMdClose className="w-6 h-6 text-gray-400" />
            </motion.span>
          </div>
          <div id="selected-list" className="overflow-y-auto max-h-96 ">
            {data.length > 0 ? (
              <div>
                {data.map((item) => (
                  <DataListItem
                    item={item}
                    key={item.id}
                    isSelected={selectedIds.has(item.id)}
                    handleToggleChannel={() => handleToggleChannel(item.id)} 
                  />
                ))}
              </div>
            ) : (
              <div className="p-3">List is empty</div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnsubscribeListModal;
