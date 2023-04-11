const deleteInstruction = (recipe, setRecipe, index) => {
  const updatedInstructions = [...recipe.instructions];
  updatedInstructions.splice(index, 1);
  setRecipe({ ...recipe, instructions: updatedInstructions });
};

export default deleteInstruction;