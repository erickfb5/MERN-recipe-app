import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001/recipes" });

export const fetchRecipe = async (setRecipes, setLoading) => {
  try {
    const { data } = await api.get("");
    setRecipes(data.reverse());
    setLoading(false);
  } catch (err) {
    console.error(`Error fetching recipes: ${err}`);
    throw new Error("Failed to fetch recipes.");
  }
};

export const fetchSavedRecipe = async (userId, setSavedRecipes) => {
  try {
    const { data } = await api.get(`/savedRecipes/ids/${userId}`);
    setSavedRecipes(data.savedRecipes);
  } catch (err) {
    console.error(`Error fetching saved recipes: ${err}`);
    throw new Error("Failed to fetch saved recipes.");
  }
};

export const saveRecipe = async (recipeId, userId, setSavedRecipes) => {
  try {
    const { data } = await api.put("", { recipeId, userId });

      setSavedRecipes(data.savedRecipes);
  } catch (err) {
    console.error(`Error saving recipe: ${err}`);
    throw new Error("Failed to save recipe.");
  }
};

export const fetchSavedRecipes = async (
  userId,
  setSavedRecipes,
  setLoading
) => {
  try {
    const { data } = await api.get(`/savedRecipes/${userId}`);
    setSavedRecipes(data.savedRecipes);
    setLoading(false);
  } catch (err) {
    console.error(`Error fetching saved recipes: ${err}`);
    throw new Error("Failed to fetch saved recipes.");
  }
};
