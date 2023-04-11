import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";

import { useGetUserId } from "../hooks/useGetUserId";
import { useGetUsername } from "../hooks/useGetUsername";
import {
  addIngredient,
  deleteIngredient,
  handleChange,
  handleIngredientChange,
  handleInstructionChange,
} from "../utils/utils";
import { createRecipe } from "../api/createRecipe";

const CreateRecipe = () => {
  const userId = useGetUserId();
  const username = useGetUsername();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
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
      setTimeout(() => navigate("/login"), 1500);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ingredients, instructions } = recipe;

    if (!ingredients[0] || !instructions[0]) {
      return toast.warning("Ingredients and instructions must be added.");
    }

    await createRecipe(recipe, navigate);
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
                <TiDelete
                  size="30px"
                  color="red"
                  onClick={() => deleteIngredient(recipe, setRecipe, index)}
                />
              </div>
            ))}

            <div
              className="add-button"
              onClick={() => addIngredient(recipe, setRecipe)}
            >
              <MdOutlineAddCircle size="25px" color="white" type="button" />
            </div>

            <label htmlFor="instructions">Instructions</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <textarea
                type="text"
                name="instructions"
                value={instructions}
                onChange={(event) =>
                  handleInstructionChange(event, recipe, setRecipe)
                }
                required
                style={{ minHeight: 100, resize: "vertical" }}
              />
            </div>

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
            <button className="submit" type="submit">
              Create Recipe
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateRecipe;
