/* eslint-disable react/prop-types */
import { IoIosAlert, IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

const ConfirmationModal = ({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No, Cancel",
  icon = <IoIosAlert className="w-6 h-6 text-red-500" />,
  iconColor = "red-500",
  confirmButtonClass = "bg-red-500 hover:bg-red-600 border-red-500",
  cancelButtonClass = "border-2 border-red-500 hover:bg-red-500/10",
  conditiontoAnimate,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex z-[99] justify-center items-center px-4 sm:px-0">
      <AnimatePresence>
        {conditiontoAnimate && (
          <motion.div
            key={Math.random()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className=" bg-gray-900 rounded-md overflow-hidden p-4 relative"
          >
            <motion.span
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2"
            >
              <IoMdClose
                className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={onCancel}
              />
            </motion.span>

            <div className="flex flex-col items-center gap-4 p-4 ">
              <div className="flex items-center gap-2">
                {icon && <span className={`text-${iconColor}`}>{icon}</span>}
                <p className="text-xl">{title}</p>
              </div>

              {message && (
                <div className=" max-w-72 px-4 py-2 flex   gap-2  rounded-md text-red-500 text-sm bg-red-500/20 text-center">
                  {message}
                </div>
              )}

              <div className="flex gap-6 max-w-72 w-full justify-center">
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${cancelButtonClass}`}
                  onClick={onCancel}
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${confirmButtonClass}`}
                  onClick={onConfirm}
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationModal;
