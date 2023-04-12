import { toast } from "react-toastify";

import { api, fetchSavedRecipes } from ".";

const deleteSavedRecipe = async (
  recipeId,
  userId,
  setSavedRecipes,
  setLoading
) => {
  try {
    setLoading(true);
    await api.delete("", { data: { recipeId, userId } });

    fetchSavedRecipes(userId, setSavedRecipes);
    setLoading(false);
  } catch (err) {
    console.error(`Error deleting recipe: ${err}`);

    toast.dismiss();
    toast.error(err.message);

    throw new Error("Failed to delete recipe.");
  }
};

export default deleteSavedRecipe;
