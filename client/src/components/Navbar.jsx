import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useGetUserID } from "../hooks/useGetUserID";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = useGetUserID();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
  };

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      {userID && <Link to="/saved-recipes">Saved Recipes</Link>}

      {!cookies.access_token ? (
        <Link to="/login">Log in</Link>
      ) : (
        <Link to={'/login'} style={{color:'red'}} onClick={logout}>Log out</Link>
      )}
    </div>
  );
};

export default Navbar;
