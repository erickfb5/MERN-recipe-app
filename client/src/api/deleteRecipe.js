import { api } from ".";

export const deleteRecipe = async (recipeId) => {
  try {
    const { data } = await api.delete(`/${recipeId}`);
    return data;
  } catch (err) {
    console.error(`Error deleting recipe: ${err}`);
    throw new Error("Failed to delete recipe.");
  }
};
