import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthForm } from "../components";
import { onSubmitLogin } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <>
      <ToastContainer />
      <AuthForm
        label="Log in"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onSubmit={(event) =>
          onSubmitLogin(
            event,
            username,
            password,
            setCookies,
            setTimeoutId,
            navigate
          )
        }
      />
    </>
  );
};

export default Login;
