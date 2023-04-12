import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CreateRecipe, Home, Login, NotFound, Register, SavedRecipes } from "./pages";
import { Navbar } from "./components";
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </div>
);
export default App;
