export const addIngredient = (recipe, setRecipe) => {
  const { ingredients } = recipe;
  if (ingredients.length === 0 || ingredients[ingredients.length - 1])
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...ingredients, ""],
    }));
};

export const deleteIngredient = (recipe, setRecipe, index) => {
  const updatedIngredients = [...recipe.ingredients];
  updatedIngredients.splice(index, 1);
  setRecipe({ ...recipe, ingredients: updatedIngredients });
};

export const addInstruction = (recipe, setRecipe) => {
  const { instructions } = recipe;
  if (instructions.length === 0 || instructions[instructions.length - 1])
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...instructions, ""],
    }));
};

export const deleteInstruction = (recipe, setRecipe, index) => {
  const updatedInstructions = [...recipe.instructions];
  updatedInstructions.splice(index, 1);
  setRecipe({ ...recipe, instructions: updatedInstructions });
};

export const handleChange = (event, recipe, setRecipe) => {
  const { name, value } = event.target;
  setRecipe({ ...recipe, [name]: value });
};

export const handleIngredientChange = (event, recipe, setRecipe, index) => {
  const { value } = event.target;
  const updatedIngredients = [...recipe.ingredients];
  updatedIngredients[index] = value;
  setRecipe({ ...recipe, ingredients: updatedIngredients });
};

export const handleInstructionChange = (event, recipe, setRecipe, index) => {
  const { value } = event.target;
  const updatedInstructions = [...recipe.instructions];
  updatedInstructions[index] = value;
  setRecipe({ ...recipe, instructions: updatedInstructions });
};

// const handleChange = (event) => {
//   const { name, value } = event.target;
//   setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
// };

// const handleIngredientChange = (event, index) => {
//   const { value } = event.target;
//   setRecipe((prevRecipe) => {
//     const updatedIngredients = [...prevRecipe.ingredients];
//     updatedIngredients[index] = value;
//     return { ...prevRecipe, ingredients: updatedIngredients };
//   });
// };

// const addIngredient = () => {
//   if (ingredients.length === 0 || ingredients[ingredients.length - 1])
//     setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: [...ingredients, ""] }));
// };

// const deleteIngredient = (index) => {
//   setRecipe((prevRecipe) => {
//     const updatedIngredients = [...prevRecipe.ingredients];
//     updatedIngredients.splice(index, 1);
//     return { ...prevRecipe, ingredients: updatedIngredients };
//   });
// };

// const handleInstructionChange = (event, index) => {
//   const { value } = event.target;
//   setRecipe((prevRecipe) => {
//     const updatedInstructions = [...prevRecipe.instructions];
//     updatedInstructions[index] = value;
//     return { ...prevRecipe, instructions: updatedInstructions };
//   });
// };

// const addInstruction = () => {
//   if (instructions.length === 0 || instructions[instructions.length - 1])
//     setRecipe((prevRecipe) => ({ ...prevRecipe, instructions: [...instructions, ""] }));
// };
