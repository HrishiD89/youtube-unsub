import { AiOutlineYoutube } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { RxAvatar } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { motion } from "motion/react";

export default function NavBar() {
  const { userInfo, token, setUserInfo, setToken } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmClearStorage, setconfirmClearStorage] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const navigate = useNavigate();

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
    <nav className="bg-black text-white border-b sticky top-0 z-[99] ">
      <div>
        <Toaster position="bottom-right" reverseOrder={true} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center justify-center">
            <AiOutlineYoutube className="w-8 h-8 text-red-600" />
            <Link
              to={token === null ? "/" : "/dashboard"}
              className="ml-2 text-xl "
            >
              YoutubeUnsub
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {userInfo === null ? (
              <RxAvatar className="h-8 w-8 text-gray-400" />
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
                  <span className="absolute right-0 gap-2 flex flex-col  text-sm bg-gray-900 p-4  rounded-md mt-2">
                    <p className="font-bold">Google Account</p>
                    <p className="text-gray-400">{userInfo.email}</p>
                    <p className="text-gray-400 border-b-2 border-b-gray-600 pb-2"> {userInfo.name}</p>
                    <p
                      className="py-2 px-4 text-nowrap bg-gray-500 hover:bg-gray-600   cursor-pointer rounded-md"
                      onClick={handleClearLocalStorageConfirm}
                    >
                      Clear Local Storage
                    </p>
                    <p
                      className="py-2 px-4  bg-red-500 hover:bg-red-700 cursor-pointer rounded-md"
                      onClick={handleLogoutConfirm}
                    >
                      LogOut
                    </p>
                  </span>
                )}
                <>
                  {confirmLogout && (
                    <ConfirmationModal
                      title="Are you sure?"
                      message="You want to Logout?"
                      onConfirm={logout}
                      onCancel={handleLogoutConfirm}
                      confirmText="Yes"
                      cancelText="No"
                    />
                  )}
                </>
                <>
                  {confirmClearStorage && (
                    <ConfirmationModal
                      title="Are you sure?"
                      message="You want to clear local Storage?"
                      onConfirm={clearlocalStorage}
                      onCancel={handleClearLocalStorageConfirm}
                      confirmText="Yes"
                      cancelText="No"
                    />
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
