const handleIngredientChange = (event, recipe, setRecipe, index) => {
  const { value } = event.target;
  const updatedIngredients = [...recipe.ingredients];
  updatedIngredients[index] = value;
  setRecipe({ ...recipe, ingredients: updatedIngredients });
};
export default handleIngredientChange;