import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

import { useGetUserId } from "../hooks/useGetUserId";
import {
  addIngredient,
  deleteIngredient,
  handleChange,
  handleIngredientChange,
  handleInstructionChange,
} from "../utils/utils";
import { api } from "../api";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
  },
};

Modal.setAppElement("#root");

const EditRecipe = ({ recipe, setRecipes, setLoading  }) => {
  const userId = useGetUserId();
//   const currentDate = new Date();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const { _id,name, ingredients, instructions, imageUrl, cookingTime } =
    updatedRecipe;

    const recipeId = _id;

    console.log('updatedRecipe',recipeId)

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.warning("You must log in to edit a recipe!");
      setTimeout(() => navigate("/login"), 3000);
    }
  }, []);

  const handleOpenModal = () => setModalIsOpen(true);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setUpdatedRecipe(recipe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ingredients[0] || !instructions) {
      return toast.warning("Ingredients and instructions must be added.");
    }

    try {

        setLoading(true);
        await api.put(`/${recipeId}`, {
          ...updatedRecipe,
        //   updatedAt: currentDate,
        });
        const { data } = await api.get("/");
        setLoading(false);
        setRecipes(data.reverse());

      toast.dismiss();
      toast.success("Recipe was updated.");
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <button className="edit-button" onClick={handleOpenModal}>
        Edit
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
      >
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) =>
              handleChange(event, updatedRecipe, setUpdatedRecipe)
            }
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
                  handleIngredientChange(
                    event,
                    updatedRecipe,
                    setUpdatedRecipe,
                    index
                  )
                }
                required
              />
              <button
                className="delete-button"
                type="button"
                onClick={() =>
                  deleteIngredient(updatedRecipe, setUpdatedRecipe, index)
                }
              >
                x
              </button>
            </div>
          ))}
          <button
            className="add-button"
            type="button"
            onClick={() => addIngredient(updatedRecipe, setUpdatedRecipe)}
          >
            Add
          </button>

          <label htmlFor="instructions">Instructions</label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <textarea
              type="text"
              name="instructions"
              value={instructions}
              onChange={(event) =>
                handleInstructionChange(event, updatedRecipe, setUpdatedRecipe)
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
            value={imageUrl}
            onChange={(event) =>
              handleChange(event, updatedRecipe, setUpdatedRecipe)
            }
            required
          />

          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={cookingTime}
            onChange={(event) =>
              handleChange(event, updatedRecipe, setUpdatedRecipe)
            }
            required
          />
          <button className="submit" type="submit">
            Update Recipe
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EditRecipe;
