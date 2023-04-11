import { toast } from "react-toastify";

import { api } from ".";

const saveRecipe = async (recipeId, userId, setSavedRecipes) => {
  try {
    const { data } = await api.put("", { recipeId, userId });

    setSavedRecipes(data.savedRecipes);
  } catch (err) {
    console.error(`Error saving recipe: ${err}`);

    toast.dismiss();
    toast.error(err.message);

    throw new Error("Failed to save recipe.");
  }
};

export default saveRecipe;
