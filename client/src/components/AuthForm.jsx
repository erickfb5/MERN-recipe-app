import { Link } from "react-router-dom";

import { FormInput } from "./FormInput";

 const AuthForm = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  const usernameRegex = /^[a-zA-Z]?(?!.*__)[a-zA-Z_]*$/;
  const passwordRegex = /^(\S+)?$/;

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <FormInput
          label="Username"
          type="username"
          value={username}
          onChange={(event) =>
            label !== "Register"
              ? setUsername(event.target.value.toLowerCase())
              : usernameRegex.test(event.target.value) &&
                setUsername(event.target.value.toLowerCase())
          }
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            passwordRegex.test(event.target.value) &&
            setPassword(event.target.value)
          }
        />
        <button className="submit" type="submit">
          {label}
        </button>
        <br />
        <br />

        {label === "Log in" && (
          <>
            Don't have an account?
            <Link className="register-link" to={"/register"}>
              Register
            </Link>
            now.
          </>
        )}
      </form>
    </div>
  );
};

export default AuthForm