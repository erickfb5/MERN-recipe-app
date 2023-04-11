const handleInstructionChange = (event, recipe, setRecipe) => {
  const { value } = event.target;
  setRecipe({ ...recipe, instructions: value });
};

export default handleInstructionChange;