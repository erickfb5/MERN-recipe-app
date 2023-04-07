import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUsername } from "../hooks/useGetUsername";
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
  const username = useGetUsername();
  const currentDate = new Date();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    cookingTime: 0,
    userOwner: userId,
    createdBy: username,
    createdAt: "",
  });

  const { ingredients, instructions } = recipe;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.warning("You must log in to create a recipe!");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ingredients, instructions } = recipe;
    
    if (!ingredients[0] || !instructions[0]) {
      return toast.warning("Ingredients and instructions must be added.")
    }

    try {
      await axios.post("http://localhost:3001/recipes", {
        ...recipe,
        createdAt: new Date(),
      });
      toast.success("New recipe was created.");
      setTimeout(() => navigate("/"), 3000);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />

      {userId && (
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
            <button
              type="button"
              onClick={() => addIngredient(recipe, setRecipe)}
            >
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
            <button
              onClick={() => addInstruction(recipe, setRecipe)}
              type="button"
            >
              Add
            </button>

            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={(event) => handleChange(event, recipe, setRecipe)}
              required
            />

            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              onChange={(event) => handleChange(event, recipe, setRecipe)}
              required
            />
            <button type="submit">Create Recipe</button>
            
          </form>
        </div>
      )}
    </>
  );
};

export default CreateRecipe;
