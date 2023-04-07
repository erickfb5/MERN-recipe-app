import { api } from ".";

export const deleteRecipe = async (recipeId, setRecipes, setLoading) => {
  try {
    setLoading(true);
    await api.delete(`/${recipeId}`);
    const { data } = await api.get("/");
    setLoading(false);
    setRecipes(data.reverse());
  } catch (err) {
    console.error(`Error deleting recipe: ${err}`);
    throw new Error("Failed to delete recipe.");
  }
};
