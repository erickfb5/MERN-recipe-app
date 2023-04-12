import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Modal from "react-modal";

import { deleteRecipe } from "../api";

const customStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "700px",
  },
};

const DeleteRecipe = ({ recipeId, recipeName, setRecipes, setLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId, setRecipes, setLoading);
      setModalIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <MdDeleteForever
        className="delete-recipe"
        onClick={() => setModalIsOpen(true)}
      />
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Delete Recipe Modal"
      >
        <h2>{`Do you really want to delete this ${recipeName} recipe?`}</h2>
        <div className="modal-buttons">
          <button className="button-yes" onClick={handleDelete}>
            Yes
          </button>
          <button
            className="button-cancel"
            onClick={() => setModalIsOpen(false)}
          >
            No!
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRecipe;
