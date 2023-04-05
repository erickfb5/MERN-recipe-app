import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form } from "./Form";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      const { message } = err.response.data;
      setErrorMessage(message);
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Log in"
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default Login;
