import { useGoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../contexts/UserContext";
import { CheckCircle, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Footer from "../components/Footer";

export default function LandingPage() {
  const { setUserInfo, setToken } = useUserContext();
  const navigate = useNavigate();

  async function fetchUserInfo(access_token) {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/youtube",
    onSuccess: async (tokenResponse) => {
      const { access_token, expires_in } = tokenResponse;

      const userData = await fetchUserInfo(access_token);
      setUserInfo(userData);
      setToken(access_token);
      setTimeout(() => {
        setToken(null);
      }, 1000 * expires_in);
      navigate("/dashboard");
    },
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Clean Up Your YouTube</span>
              <span className="block text-red-600">Subscriptions in Bulk</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Easily manage and unsubscribe from multiple YouTube channels at
              once. Take control of your feed and declutter your subscription
              list.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => login()}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6  rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-white">
                Bulk Unsubscribe
              </h3>
              <p className="mt-2 text-gray-400">
                Select multiple channels and unsubscribe from them all at once.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6  rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-white">
                Search & Review
              </h3>
              <p className="mt-2 text-gray-400">
                Easily search for channels from your subscription list and
                review them before unsubscribing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6  rounded-lg shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-white">
                Secure & Safe
              </h3>
              <p className="mt-2 text-gray-400">
                Uses official YouTube API. Your data stays private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
      
    </div>
  );
}
