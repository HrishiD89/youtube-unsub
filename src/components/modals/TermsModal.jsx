/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const TermsModal = ({ termsModal, handleTermsToggle }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md p-4">
      <AnimatePresence>
        {termsModal && (
          <motion.div
            key="termsModal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-10 w-full max-w-2xl overflow-hidden rounded-md bg-gray-900"
          >
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
                Privacy Policy & Terms
              </h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-4">
                  <span>
                    <FaCircle className="h-2 w-2 text-blue-500" />
                  </span>
                  This app is not affiliated with, endorsed, or promoted by
                  YouTube or Google.
                </li>
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
                  All authentication is handled via Google OAuth.
                </li>

                <li className="flex items-center gap-4">
                  <span>
                    <FaCircle className="h-2 w-2 text-blue-500" />
                  </span>
                  By using this tool, you agree that all actions performed (such
                  as unsubscribing) are your responsibility.
                </li>

                <li className="flex items-center gap-4">
                  <span>
                    <FaCircle className="h-2 w-2 text-blue-500" />
                  </span>
                  We are not responsible for any unintended consequences, such
                  as loss of subscriptions or account restrictions.
                </li>
                <li className="flex items-center gap-4">
                  <span>
                    <FaCircle className="h-2 w-2 text-blue-500" />
                  </span>
                  This tool relies on the YouTube API, which may change or
                  become restricted at any time. We do not guarantee
                  uninterrupted access.
                </li>
                <li className="flex items-center gap-4">
                  <span>
                    <FaCircle className="h-2 w-2 text-blue-500" />
                  </span>
                  Users must comply with YouTube’s Terms of Service and API
                  policies while using this tool.
                </li>
                <li className="flex  flex-col ">
                  <span className="flex item-center items-center gap-4">
                    <span>
                      <FaCircle className="h-2 w-2 text-blue-500" />
                    </span>
                    Users can revoke this tool’s access anytime via their Google
                    account settings.
                  </span>
                  <a
                    className="text-blue-400 underline italic"
                    href="https://myaccount.google.com/security?continue=https://myaccount.google.com/security"
                  >
                    <span className=" text-nowrap pl-6">
                      Google Account Security &rarr; Third-party apps &rarr;
                      youtube-unsuscribe &rarr; Remove Access
                    </span>
                  </a>
                </li>
              </ul>
              <div className="w-full items-center flex flex-col gap-4 py-3">
                <motion.button
                  onClick={handleTermsToggle}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-500 hover:bg-blue-600  rounded-md text-sm py-2 px-4 w-full"
                >
                  I Understand
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TermsModal;
