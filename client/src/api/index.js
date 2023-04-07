import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3001/recipes" });

export { deleteRecipe } from "./deleteRecipe";
export { fetchRecipe } from "./fetchRecipe";
export { fetchSavedRecipe } from "./fetchSavedRecipe";
export { fetchSavedRecipes } from "./fetchSavedRecipes";
export { saveRecipe } from "./saveRecipe";
