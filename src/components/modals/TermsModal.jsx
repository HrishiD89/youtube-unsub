/* eslint-disable react/prop-types */
import { motion } from "framer-motion"; // Corrected import for motion
import { FaCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const TermsModal = ({ handleTermsToggle }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md p-4">
      <div className="mx-auto mt-40 w-full max-w-2xl overflow-hidden rounded-md bg-gray-900">
        <div className="flex items-center justify-end bg-gray-800 px-4 py-2">
          <motion.span
            whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer group"
            onClick={handleTermsToggle}
          >
            <IoMdClose className="h-5 w-5 text-blue-500" />
          </motion.span>
        </div>

        <div className="p-4 w-full flex flex-col gap-4">
          <h2 className="sm:text-2xl text-xl font-semibold text-white">
            Terms & Conditions
          </h2>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              We do not store, track, or collect any personal data.
            </li>
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              This tool interacts directly with the YouTube API but does not
              retain any user credentials.
            </li>
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              All authentication is handled via Google OAuth
            </li>
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              We do not share, sell, or misuse any user data.
            </li>
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              By using this tool, you agree that all actions performed (such as
              unsubscribing) are your responsibility.
            </li>
            <li className="flex items-center gap-4">
              <span>
                <FaCircle className="h-2 w-2 text-blue-500" />
              </span>
              This tool is open-source and intended for educational purposes.
            </li>
          </ul>
          <div className=" w-full items-center  flex flex-col gap-4 py-3">
            <motion.button
              onClick={handleTermsToggle}
              whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
              whileTap={{ scale: 0.9 }}
              className=" bg-blue-500 max-w-lg  rounded-md text-sm py-2 px-4 w-full"
            >
              I Understand
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
