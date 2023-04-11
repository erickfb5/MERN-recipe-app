import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { GrEdit } from "react-icons/gr";

import {
  addIngredient,
  deleteIngredient,
  handleChange,
  handleIngredientChange,
  handleInstructionChange,
} from "../utils/utils";
import { updateRecipe } from "../api/updateRecipe";

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

const EditRecipe = ({ recipe, setRecipes, setLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

  const { _id, name, ingredients, instructions, imageUrl, cookingTime } =
    updatedRecipe;

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
    await updateRecipe(
      _id,
      updatedRecipe,
      setRecipes,
      setLoading,
      handleCloseModal
    );
  };

  return (
    <>
      <ToastContainer />
      <GrEdit className="edit-icon" onClick={handleOpenModal} />

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
