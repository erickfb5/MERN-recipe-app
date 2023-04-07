import { api } from ".";

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
