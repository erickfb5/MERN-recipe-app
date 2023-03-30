import { useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";

export const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  errorMessage,
}) => {
  const navigate = useNavigate();
  const usernameRegex = /^[a-zA-Z]?(?!.*__)[a-zA-Z_]*$/;


  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <FormInput
          label="Username"
          type="username"
          value={username}
          onChange={(event) =>
            usernameRegex.test(event.target.value) &&
            setUsername((event.target.value).toLowerCase())
          }
        />
        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errorMessage && (
          <p className="error-message">
            {errorMessage} <br />
          </p>
        )}
        <button type="submit">{label}</button>

        <br />
        <br />
        {label === "Login" && (
          <button onClick={() => navigate("/register")}>REGISTER</button>
        )}
      </form>
    </div>
  );
};
