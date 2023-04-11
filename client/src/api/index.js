import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3001/recipes" });

export { default as authLogin } from "./authLogin";
export { default as authRegister } from "./authRegister";
export { default as createRecipe } from "./createRecipe";
export { default as deleteRecipe } from "./deleteRecipe";
export { default as fetchRecipe } from "./fetchRecipe";
export { default as fetchSavedRecipe } from "./fetchSavedRecipe";
export { default as fetchSavedRecipes } from "./fetchSavedRecipes";
export { default as saveRecipe } from "./saveRecipe";
export { default as updateRecipe } from "./updateRecipe";
