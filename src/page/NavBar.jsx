import { AiOutlineYoutube } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { motion } from "motion/react";
import TermsModal from "../components/modals/TermsModal";
import { LuLogOut } from "react-icons/lu";
import { MdDeleteSweep, MdPrivacyTip } from "react-icons/md";

export default function NavBar() {
  const { userInfo, token, setUserInfo, setToken } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClearStorage, setconfirmClearStorage] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [termsModal, setTermsModal] = useState(false);

  const navigate = useNavigate();

  const handleTermsToggle = () => {
    setTermsModal(!termsModal);
  };

  const logout = () => {
    setUserInfo(null);
    setToken(null);
    setIsOpen(false);
    setConfirmLogout(false);
    navigate("/");
    toast.success("You have been logged out successfully!");
  };

  const handleLogoutConfirm = () => {
    setConfirmLogout(!confirmLogout);
    setIsOpen(false);
  };

  const handleClearLocalStorageConfirm = () => {
    setconfirmClearStorage(!confirmClearStorage);
    setIsOpen(false);
  };

  const clearlocalStorage = () => {
    if (userInfo?.email) {
      const key = `${userInfo.email}_data`;
      localStorage.removeItem(key);
      setUserInfo(null);
      setToken(null);
      setIsOpen(false);
      setconfirmClearStorage(false);
      navigate("/");
      toast.success("Your local data has been cleared!");
    }
  };

  return (
    <nav className="bg-[#0f0f0f] text-white border-b border-b-gray-800  font-roboto  sticky top-0 z-[99] ">
      <div>
        <Toaster position="bottom-right" reverseOrder={true} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between  h-14 items-center">
          <div className="flex items-center justify-center">
            <AiOutlineYoutube className="w-8 h-8 text-red-600" />
            <Link
              to={token === null ? "/" : "/dashboard"}
              className="ml-2 sm:text-xl text-lg "
            >
              YoutubeUnsub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {userInfo === null ? (
              <div className="relative flex items-center justify-center gap-3 flex-shrink-0">
                <motion.button
                  onClick={handleTermsToggle}
                  whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
                  whileTap={{ scale: 0.9 }}
                  className=" bg-blue-500 p-2 rounded-full text-white"
                >
                  <MdPrivacyTip className="w-5 h-5" />
                </motion.button>
                <>
                  {termsModal && (
                    <TermsModal termsModal={termsModal} handleTermsToggle={handleTermsToggle} />
                  )}
                </>
              </div>
            ) : (
              <div className="relative">
                <motion.img
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="h-8 w-8 rounded-full cursor-pointer "
                  src={userInfo.picture}
                  alt=""
                />
                {isOpen && (
                  <span className="absolute right-0 min-w-56  gap-2 flex flex-col  bg-gray-900 p-4  rounded-md mt-2">
                    <p className="font-bold">Google Account</p>
                    <p className="text-gray-400 text-sm">{userInfo.email}</p>
                    <p className="text-gray-400 text-sm border-b-2 border-b-gray-600 pb-2">
                      {userInfo.name}
                    </p>
                    <p onClick={handleTermsToggle} className="py-2 px-4 flex items-center gap-2  bg-blue-500 hover:bg-blue-700 cursor-pointer rounded-md">
                      Privacy Policy
                    </p>
                    <p
                      className="py-2 px-4 flex items-center gap-2 text-nowrap bg-gray-500 hover:bg-gray-600   cursor-pointer rounded-md"
                      onClick={handleClearLocalStorageConfirm}
                    >
                      <span>
                        <MdDeleteSweep className="w-5 h-5 " />
                      </span>
                      Clear Data
                    </p>
                    <p
                      className="py-2 px-4 flex items-center gap-2  bg-red-500 hover:bg-red-700 cursor-pointer rounded-md"
                      onClick={handleLogoutConfirm}
                    >
                      <span>
                        <LuLogOut className="w-5 h-5 " />
                      </span>
                      LogOut
                    </p>
                  </span>
                )}
                <>
                  {confirmLogout && (
                    <ConfirmationModal
                      conditiontoAnimate={confirmLogout}
                      title="Are you sure?"
                      message="This will log you out, remove your session."
                      onConfirm={logout}
                      onCancel={handleLogoutConfirm}
                      confirmText="Yes, Logout"
                      cancelText="No, Cancel"
                    />
                  )}
                </>
                <>
                  {confirmClearStorage && (
                    <ConfirmationModal
                      conditiontoAnimate={confirmClearStorage}
                      title="Are you sure?"
                      message="This will log you out, remove your session, and clear all locally stored data."
                      onConfirm={clearlocalStorage}
                      onCancel={handleClearLocalStorageConfirm}
                      confirmText="Yes, Logout"
                      cancelText="No, Cancel"
                    />
                  )}
                </>
                <>
                  {termsModal && (
                    <TermsModal termsModal={termsModal} handleTermsToggle={handleTermsToggle} />
                  )}
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
