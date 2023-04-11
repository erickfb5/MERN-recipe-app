import { toast } from "react-toastify";

import { api } from ".";

 const updateRecipe = async (
  ingredients,
  instructions,
  recipeId,
  updatedRecipe,
  setRecipes,
  setLoading,
  handleCloseModal
) => {
  try {
    if (!ingredients[0] || !instructions) {
      return toast.warning("Ingredients and instructions must be added.");
    }

    setLoading(true);
    await api.put(`/${recipeId}`, {
      ...updatedRecipe,
      updatedAt: new Date(),
    });
    const { data } = await api.get("/");
    setLoading(false);
    setRecipes(data.reverse());

    toast.dismiss();
    toast.success("Recipe was updated.");
    handleCloseModal();
  } catch (err) {
    console.error(`Error updating recipe: ${err}`);
    throw new Error("Failed to update recipe.");
  }
};
export default updateRecipe