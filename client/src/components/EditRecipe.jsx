import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import { GrEdit } from "react-icons/gr";

import {
  addIngredient,
  deleteIngredient,
  handleFormChange,
  handleIngredientChange,
  handleInstructionChange,
} from "../utils";
import { updateRecipe } from "../api";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineAddCircle } from "react-icons/md";

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

    try {
      await updateRecipe(
        ingredients,
        instructions,
        _id,
        updatedRecipe,
        setRecipes,
        setLoading,
        handleCloseModal
      );
    } catch (err) {
      console.error(err);
    }
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
        <div className="create-recipe">
          <h2>Edit Recipe</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(event) =>
                handleFormChange(event, updatedRecipe, setUpdatedRecipe)
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
                <TiDeleteOutline
                  className="delete-row"
                  onClick={() =>
                    deleteIngredient(updatedRecipe, setUpdatedRecipe, index)
                  }
                />
              </div>
            ))}
            <div
              className="add-button"
              type="button"
              onClick={() => addIngredient(updatedRecipe, setUpdatedRecipe)}
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
                  handleInstructionChange(
                    event,
                    updatedRecipe,
                    setUpdatedRecipe
                  )
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
                handleFormChange(event, updatedRecipe, setUpdatedRecipe)
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
                handleFormChange(event, updatedRecipe, setUpdatedRecipe)
              }
              required
            />
            <button className="submit" type="submit">
              Update Recipe
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditRecipe;
