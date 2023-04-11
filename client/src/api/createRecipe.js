import { toast } from "react-toastify";

import { api } from ".";

export const createRecipe = async (recipe, navigate) => {
  try {
    await api.post("http://localhost:3001/recipes", {
      ...recipe,
      createdAt: new Date(),
    });

    toast.dismiss();
    toast.success("New recipe was created.");
    setTimeout(() => navigate("/"), 2000);
  } catch (err) {
    console.error(`Error creating recipe: ${err}`);
    throw new Error("Failed to create recipe.");
  }
};
