import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Form } from "../components/Form";

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

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      const { token, userId } = response.data;
      setCookies("access_token", token);
      window.localStorage.setItem("userId", userId);
      window.localStorage.setItem("username", `@${username}`);

      toast.success(`Successfully logged in as @${username}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

      setTimeoutId(setTimeout(() => navigate("/"), 2500));
    } catch (err) {
      const { message } = err.response.data;
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(err);
    }
  };

  return (
    <>
    <ToastContainer/>
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Log in"
      onSubmit={onSubmit}
    />
    </>

  );
};

export default Login;
