import { createRecipe } from "../api";

const onSubmitRecipe = async (event, recipe, navigate) => {
  event.preventDefault();
  try {
    await createRecipe(recipe, navigate);
  } catch (err) {
    console.error(err);
  }
};

export default onSubmitRecipe;