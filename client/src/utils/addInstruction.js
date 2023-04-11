 const addInstruction = (recipe, setRecipe) => {
  const { instructions } = recipe;
  if (instructions.length === 0 || instructions[instructions.length - 1])
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      instructions: [...instructions, ""],
    }));
};

export default addInstruction