import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { GoSignOut } from "react-icons/go";
import { FaHome, FaSignInAlt } from "react-icons/fa";

import { useGetUserId } from "../hooks/useGetUserId";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userId = useGetUserId();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <FaHome fontSize="30px" />
      </Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {userId && <Link to="/saved-recipes">Saved Recipes</Link>}
      {!cookies.access_token ? (
        <Link to="/login">Log in  </Link>
      ) : (
        <Link to={"/login"} style={{ color: "red" }} onClick={logout}>
          <GoSignOut fontSize="30px" />
        </Link>
      )}
    </div>
  );
};

export default Navbar;
