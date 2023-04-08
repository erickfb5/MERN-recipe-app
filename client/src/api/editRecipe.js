import { api } from ".";

export const editRecipe = async (recipeId, setRecipes, setLoading) => {
    try {
      setLoading(true);
      await api.put(`/${recipeId}`);
      const { data } = await api.get("/");
      setLoading(false);
      setRecipes(data.reverse());
    } catch (err) {
      console.error(`Error editing recipe: ${err}`);
      throw new Error("Failed to edit recipe.");
    }
  };
  