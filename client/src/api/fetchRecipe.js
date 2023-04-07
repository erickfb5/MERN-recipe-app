import { toast } from "react-toastify";

import { api } from ".";

export const fetchRecipe = async (setRecipes, setLoading) => {
  try {
    const { data } = await api.get("");
    setRecipes(data.reverse());
    setLoading(false);
  } catch (err) {
    console.error(`Error fetching recipes: ${err}`);
    toast.error(err.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
    setLoading(false);

    throw new Error("Failed to fetch recipes.");
  }
};
