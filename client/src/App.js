import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { Login, Navbar, Register } from "./components/";
import {  CreateRecipe, Home, NotFound, SavedRecipes } from "./pages";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
