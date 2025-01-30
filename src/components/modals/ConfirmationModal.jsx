/* eslint-disable react/prop-types */
import { IoIosAlert } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { motion } from "motion/react";

const ConfirmationModal = ({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No, Cancel",
  icon = <IoIosAlert className="w-6 h-6 text-red-500" />, // Default icon
  iconColor = "red-500", // Default icon color
  confirmButtonClass = "bg-red-500 hover:bg-red-600 border-red-500", // Default confirm button styles
  cancelButtonClass = "border-2 border-red-500 hover:bg-red-500/10", // Default cancel button styles
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-[99] flex justify-center items-center px-4 sm:px-0">
      <div className=" bg-gray-900 rounded-md overflow-hidden p-4 relative">
        <span className="absolute top-2 right-2">
          <IoCloseCircle
            className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={onCancel} // Use onCancel prop
          />
        </span>

        <div className="flex flex-col items-center gap-4 p-4 ">
          <div className="flex items-center gap-2">
            {/* Use passed icon and color */}
            {icon && <span className={`text-${iconColor}`}>{icon}</span>}
            <p className="text-xl">{title}</p> {/* Use title prop */}
          </div>

          {/* Use message prop */}
          {message && (
            <div className="px-4 py-2 text-sm rounded-md">{message}</div>
          )}

          <div className="flex gap-6">
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${cancelButtonClass}`} // Use cancelButtonClass
              onClick={onCancel} // Use onCancel prop
            >
              {cancelText} {/* Use cancelText prop */}
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${confirmButtonClass}`} // Use confirmButtonClass
              onClick={onConfirm} // Use onConfirm prop
            >
              {confirmText} {/* Use confirmText prop */}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
