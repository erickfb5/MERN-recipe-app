import { useState } from "react";
import axios from "axios";

import { Form } from "./Form";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3001/auth/register', {
        username, password
      });

      alert('Registration completed sucessfully. Now you may login')

    } catch (error) {
      console.error(error)
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
    />
  );
};

export default Register;
