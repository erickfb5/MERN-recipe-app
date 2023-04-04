import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useGetUserId } from "../hooks/useGetUserId";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userId = useGetUserId();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {userId && <Link to="/saved-recipes">Saved Recipes</Link>}
        {!cookies.access_token ? (
          <Link to="/login">Log in</Link>
        ) : (
          <Link to={"/login"} style={{ color: "red" }} onClick={logout}>
            Log out
          </Link>
        )}
    </div>
  );
};

export default Navbar;
