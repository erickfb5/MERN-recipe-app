import { authLogin } from "../api";

const onSubmitLogin = async (
  event,
  username,
  password,
  setCookies,
  setTimeoutId,
  navigate
) => {
  event.preventDefault();
  try {
    await authLogin(username, password, setCookies, setTimeoutId, navigate);
  } catch (err) {
    console.error(err);
  }
};

export default onSubmitLogin;