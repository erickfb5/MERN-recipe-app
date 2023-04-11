import axios from "axios";
import { toast } from "react-toastify";

 const authRegister = async (
  username,
  password,
  setTimeoutId,
  navigate
) => {
  try {
    await axios.post("http://localhost:3001/auth/register", {
      username,
      password,
    });

    toast.dismiss();
    toast.success("Registration completed successfully. Now you may login", {
      autoClose: 2500,
    });

    setTimeoutId(setTimeout(() => navigate("/login"), 2500));
  } catch (err) {
    console.error("Error:", err);
    if (err.message.includes("Network")) toast.error(err.message);

    const { message } = err.response.data;
    toast.error(message);
  }
};

export default authRegister