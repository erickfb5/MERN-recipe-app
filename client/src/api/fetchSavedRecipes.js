import { api } from ".";

 const fetchSavedRecipes = async (
  userId,
  setSavedRecipes,
  setLoading
) => {
  try {
    const { data } = await api.get(`/savedRecipes/${userId}`);
    setLoading(true)
    setSavedRecipes(data.savedRecipes);
    setLoading(false);
  } catch (err) {
    console.error(`Error fetching saved recipes: ${err}`);
    throw new Error("Failed to fetch saved recipes.");
  }
};

export default fetchSavedRecipes
