import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CreateRecipe, Home, Login, Register, SavedRecipes } from "./pages";
import { Navbar, OverlayModal } from "./components";
import "./App.css";

const App = () => (
  <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route
          path="*"
          element={
            <OverlayModal
              message="Oops! The page you are looking for cannot be found."
              path={"/"}
            />
          }
        />
      </Routes>
    </Router>
  </div>
);
export default App;
