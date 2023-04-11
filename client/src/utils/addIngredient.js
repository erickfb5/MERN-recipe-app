 const addIngredient = (recipe, setRecipe) => {
    const { ingredients } = recipe;
    if (ingredients.length === 0 || ingredients[ingredients.length - 1])
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        ingredients: [...ingredients, ""],
      }));
  };

  export default addIngredient