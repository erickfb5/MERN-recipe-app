import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

import { Form } from "../components/Form";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

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
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      toast.dismiss();
      toast.success("Registration completed successfully. Now you may login", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3500,
      });

      setTimeoutId(setTimeout(() => navigate("/login"), 3500));
    } catch (err) {
      console.error("Error:", err);
      
      const { message } = err.response.data;
      if (message) return toast.error(message);
      toast.error(err.message);
    }
  };

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
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Register;
