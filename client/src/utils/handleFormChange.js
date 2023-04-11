const handleFormChange = (event, recipe, setRecipe) => {
  const { name, value } = event.target;
  setRecipe({ ...recipe, [name]: value });
};

export default handleFormChange;