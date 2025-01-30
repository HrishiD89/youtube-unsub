/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react";
import ChannelItem from "./ChannelItem";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

export const ChannelList = ({ data, selectedIds, onToggle }) => {
  return (
    <div className="flex flex-col gap-3 relative ">
      <span id="top"></span>

      <AnimatePresence>
        {data.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <ChannelItem
              item={item}
              isSelected={selectedIds.has(item.id)}
              onToggle={onToggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <span id="bottom"></span>

      {data.length > 10 && (
        <div className="flex fixed bottom-[10%] right-4 sm:hidden flex-col items-center z-[77] gap-3 w-10 px-6 py-2 rounded-md bg-gray-400/20">
          <a
            href="#top"
            onClick={() => window.scrollTo(0, 0)}
            className="p-2 rounded-md bg-gray-600"
          >
            <FaChevronUp />
          </a>
          <a href="#bottom" className="p-2 rounded-md bg-gray-600">
            <FaChevronDown />
          </a>
        </div>
      )}
    </div>
  );
};
