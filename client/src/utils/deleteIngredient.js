const deleteIngredient = (recipe, setRecipe, index) => {
  const updatedIngredients = [...recipe.ingredients];
  updatedIngredients.splice(index, 1);
  setRecipe({ ...recipe, ingredients: updatedIngredients });
};

export default deleteIngredient;