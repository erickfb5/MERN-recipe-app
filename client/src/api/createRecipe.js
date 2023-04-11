import { toast } from "react-toastify";

import { api } from ".";

 const createRecipe = async (recipe, navigate) => {
  const { ingredients, instructions } = recipe;

  if (!ingredients[0] || !instructions[0]) {
    return toast.warning("Ingredients and instructions must be added.");
  }
  try {
    await api.post("", {
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

export default createRecipe