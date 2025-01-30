/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import DataListItem from "../DataListItem";
import { motion } from "framer-motion"; // Ensure you're using the correct import for motion

const UnsubscribeListModal = ({
  data ,
  selectedIds,
  handleToggleChannel,
  toggleUnSubModal,
}) => {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[99] px-4 sm:px-0">
      <div className="max-w-2xl w-full bg-gray-900 rounded-md overflow-hidden max-h-96 mx-auto mt-64 sm:mt-40">
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
          <div className="overflow-y-auto max-h-screen">
            {data.length > 0 ? (
              <div>
                {data.map((item) => (
                  <DataListItem
                    item={item}
                    key={item.id}
                    isSelected={selectedIds.has(item.id)}
                    handleToggleChannel={() => handleToggleChannel(item.id)} // Pass a function reference
                  />
                ))}
              </div>
            ) : (
              <div className="p-3">List is empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeListModal;