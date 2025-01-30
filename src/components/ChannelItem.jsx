/* eslint-disable react/prop-types */
import { LuDot } from "react-icons/lu";
import { RiShareForwardLine } from "react-icons/ri";
import { motion } from "motion/react";
import { memo } from "react";
import { formatSubscriberCount } from "../utils";

const ChannelItem = memo(function ChannelItem({ item, isSelected, onToggle }) {
  const handleContainerClick = (e) => {
    e.stopPropagation();
    onToggle(item.id);
  };

  const handleShareClick = (e) => {
    e.stopPropagation(); 
  };

  const trimToWords = (text, wordLimit) => {
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <div
      onClick={() => onToggle(item.id)}
      className={` ${
        isSelected ? "bg-red-400/20 hover:bg-red-400/20" : ""
      } flex  cursor-pointer w-full px-4 py-3 rounded-md justify-center items-center gap-4 hover:bg-gray-400/10 `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        name="checkbox"
        className=" accent-red-500 w-5 h-5"
        onChange={handleContainerClick}
      />

      <img
        className=" object-cover sm:w-16 sm:h-16 w-10 h-10 rounded-full"
        src={item.snippet.thumbnails.default.url}
        alt={item.snippet.title}
        loading="lazy"
      />
      <div className="flex justify-between w-full items-center ">
        <div className="flex flex-col pl-4  max-w-4xl justify-center">
          <span className="relative ">
            <span className="text-xl">{item.snippet.title}</span>
          </span>
          <div className="flex flex-col gap-1 w-full ">
            <div className=" text-xs text-gray-400 flex sm:items-center sm:flex-row flex-col ">
              <p>{item.details.snippet.customUrl}</p>
              <LuDot className="hidden sm:block" />
              <p>
                {formatSubscriberCount(item.details.statistics.subscriberCount)}
              </p>
            </div>
            <div className="hidden sm:block text-xs text-gray-400 w-full ">
              <p>{trimToWords(item.snippet.description, 55)}</p>
            </div>
          </div>
        </div>
        <motion.a
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShareClick}
          className="text-gray-400 p-2 rounded-full hover:bg-gray-400/20 group relative"
          href={`https://www.youtube.com/${item.details.snippet.customUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiShareForwardLine className="w-5 h-5" />
          <p className="absolute -bottom-8 right-0  group-hover:bg-gray-600 text-[10px]  rounded-sm  py-1 px-2 whitespace-nowrap  hidden group-hover:block">
            Visit Channel
          </p>
        </motion.a>
      </div>
    </div>
  );
});

export default ChannelItem;
