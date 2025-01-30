/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const TermsModal = ({ termsModal, handleTermsToggle }) => {
  return (
    <AnimatePresence>
      {termsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md p-4 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-2xl rounded-md bg-gray-900 shadow-lg overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-3 ">
              <h2 className="text-lg font-semibold text-white">
                Privacy Policy & Terms
              </h2>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-500"
                onClick={handleTermsToggle}
              >
                <IoMdClose className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Modal Content */}
            <div className="p-5 text-gray-400 text-sm">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500">•</span>
                  This app uses the YouTube API but is not affiliated with YouTube or Google. No personal data is collected.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500">•</span>
                  Authentication is via Google OAuth. Actions like unsubscribing are your responsibility.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500">•</span>
                  We are not liable for unintended consequences (e.g., lost subscriptions).
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500">•</span>
                  Users must comply with YouTube&apos;s Terms of Service.
                </li>
                <li className="flex flex-col gap-1">
                  <span className="flex items-start gap-3">
                    <span className="text-blue-500">•</span>
                    You can revoke access anytime via your Google Account Security.
                  </span>
                  <a
                    className="text-blue-400 underline italic pl-6"
                    href="https://myaccount.google.com/security?continue=https://myaccount.google.com/security"
                  >
                    Google Account Security &rarr; Third-party apps &rarr; youtube-unsubscribe &rarr; Remove Access
                  </a>
                </li>
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="px-5 pb-5">
              <motion.button
                onClick={handleTermsToggle}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded-md text-white font-medium"
              >
                I Understand
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TermsModal;
