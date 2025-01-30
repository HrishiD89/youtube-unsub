/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react";
import ChannelItem from "./ChannelItem";

export const ChannelList = ({ data, selectedIds, onToggle }) => {
  return (
    <div className="flex flex-col gap-3 relative ">
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
    </div>
  );
};
