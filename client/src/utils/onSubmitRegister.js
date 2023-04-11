import { authRegister } from "../api";

const onSubmitRegister = async (
  event,
  username,
  password,
  setTimeoutId,
  navigate
) => {
  event.preventDefault();

  try {
    await authRegister(username, password, setTimeoutId, navigate);
  } catch (err) {
    console.error(err);
  }
};

export default onSubmitRegister;