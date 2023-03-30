import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form } from "./Form";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/auth/register', {
        username, password
      });

      alert('Registration completed sucessfully. Now you may login')
      navigate('/login')

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
      label="Register"
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default Register;
