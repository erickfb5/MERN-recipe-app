import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useGetUserId } from "../hooks/useGetUserId";

import {
  addIngredient,
  addInstruction,
  deleteIngredient,
  deleteInstruction,
  handleChange,
  handleIngredientChange,
  handleInstructionChange,
} from "../utils/utils";

const CreateRecipe = () => {
  const userId = useGetUserId();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
  });

  const { ingredients, instructions } = recipe;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      alert("You must log in to create a recipe!");
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
const {ingredients, instructions} = recipe;
alert(ingredients, instructions)
    if (!ingredients || !instructions) return

    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("New recipe was created.");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => handleChange(event, recipe, setRecipe)}
          required
        />

        <label htmlFor="ingredients">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <input
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) =>
                handleIngredientChange(event, recipe, setRecipe, index)
              }
              required
            />
            <button
              className="delete-button"
              type="button"
              onClick={() => deleteIngredient(recipe, setRecipe, index)}
            >
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addIngredient(recipe, setRecipe)}>
          Add
        </button>

        <label htmlFor="instructions">Instructions</label>
        {instructions?.map((instruction, index) => (
            <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
          <input
            key={index}
            type="text"
            name="instructions"
            value={instruction}
            onChange={(event) =>
              handleInstructionChange(event, recipe, setRecipe, index)
            }
            required
          />
          <button
          className="delete-button"
          type="button"
          onClick={() => deleteInstruction(recipe, setRecipe, index)}
        >
          x
          </button>
          </div>
        ))}
        <button onClick={()=> addInstruction(recipe, setRecipe)} type="button">
          Add
        </button>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={(event) => handleChange(event, recipe, setRecipe)}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={(event) => handleChange(event, recipe, setRecipe)}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
