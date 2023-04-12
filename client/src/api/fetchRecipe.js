import { toast } from "react-toastify";

import { api } from ".";

const fetchRecipe = async (setRecipes, setLoading) => {
  try {
    setLoading(true);
    const { data } = await api.get("");
    setRecipes(data.reverse());
    setLoading(false);
  } catch (err) {
    console.error(`Error fetching recipes: ${err}`);
    toast.error(err);
    throw new Error("Failed to fetch recipes.");
  }
};

export default fetchRecipe;