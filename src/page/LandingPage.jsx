import { useGoogleLogin } from "@react-oauth/google";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LandingPage() {
  const { userInfo, setUserInfo, setToken } = useUserContext();

  const naviagate = useNavigate();

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
      naviagate("/dashboard");
    },
  });

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <h1>Landing Page</h1>
      {!userInfo && (
        <button
          className="px-4 py-2 bg-blue-400 rounded-md text-white"
          onClick={() => login()}
        >
          Google Login
        </button>
      )}
    </div>
  );
}
