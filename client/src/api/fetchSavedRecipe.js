import { toast } from "react-toastify";

import { api } from ".";

export const fetchSavedRecipe = async (userId, setSavedRecipes) => {
    try {
      const { data } = await api.get(`/savedRecipes/ids/${userId}`);
      setSavedRecipes(data.savedRecipes);
    } catch (err) {
      console.error(`Error fetching saved recipes: ${err}`);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      
      throw new Error("Failed to fetch saved recipes.");
    }
  };