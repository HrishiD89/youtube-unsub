/* eslint-disable react/prop-types */
import { FaMinusCircle } from "react-icons/fa";
import { motion } from "motion/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// const DataListItem = ({
//   data,
//   handleToggleChannel,
// }) => {
//   return (
//     <div
//       key={data.id}
//       className="flex relative items-center p-3 gap-3 hover:bg-gray-400/20 cursor-pointer justify-between"
//     >
//       <div className="flex items-center gap-3 w-full ">
//         <img
//           className="w-10 h-10 rounded-full"
//           src={data.snippet.thumbnails.default.url}
//           alt={data.snippet.title}
//         />
//         <div>
//           <p>{data.snippet.title}</p>
//           <p className="text-gray-400 text-sm">
//             {data.details.snippet.customUrl}
//           </p>
//         </div>
//       </div>

//       <motion.span
//         whileHover={{
//           scale: 1.2,
//           transition: { duration: 0.1 },
//         }}
//         whileTap={{ scale: 0.9 }}
//         className="text-gray-400 rounded-md "
//         onClick={handleToggleChannel}
//       >
//         <FaMinusCircle className=" text-red-500   w-5 h-5 " />
//       </motion.span>
//     </div>
//   );
// };

// export default DataListItem;
const DataListItem = ({
  item,
  icon = <HiOutlineDotsHorizontal className=" w-5 h-5 " />,
  handleToggleChannel,
  isSelected,
  searchModal
}) => {
  return (
    <div
      key={item.id}
      onClick={searchModal ? handleToggleChannel : ""}
      className="flex relative items-center p-3 gap-3 hover:bg-gray-400/20 cursor-pointer justify-between"
    >
      <div className="flex items-center gap-3 w-full ">
        <img
          className="w-10 h-10 rounded-full"
          src={item.img}
          alt={item.title}
        />
        <div>
          <p>{item.title}</p>
          <p className="text-gray-400 text-sm">{item.customUrl}</p>
        </div>
      </div>

      {isSelected ? (
        <motion.span
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-400 rounded-md "
          onClick={() => handleToggleChannel(item.id)}
        >
          <FaMinusCircle className=" text-red-500   w-5 h-5 " />
        </motion.span>
      ) : (
        <span className="text-gray-400   rounded-md bg-gray-400/20 ">
          {icon}
        </span>
      )}
    </div>
  );
};

export default DataListItem;