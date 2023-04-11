import axios from "axios";
import { toast } from "react-toastify";

 const authLogin = async (
  username,
  password,
  setCookies,
  setTimeoutId,
  navigate
) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", {
      username,
      password,
    });
    const { token, userId } = response.data;
    setCookies("access_token", token);
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("username", `@${username}`);

    toast.dismiss();
    toast.success(`Successfully logged in as @${username}`, {
      autoClose: 2500,
    });

    setTimeoutId(setTimeout(() => navigate("/"), 2500));
  } catch (err) {
    console.error("Error:", err);
    if (err.message.includes("Network")) toast.error(err.message);

    const { message } = err.response.data;
    toast.error(message);
  }
};

export default authLogin