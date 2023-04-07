import { useState } from "react";
import Modal from "react-modal";
import { deleteRecipe } from "../api";

const DeleteRecipe = ({ recipeId, recipeName,setRecipes, setLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteRecipe(recipeId, setRecipes, setLoading);
    setModalIsOpen(false);
  };

  
  return (
    <>
      <button className="delete-recipe" onClick={() => setModalIsOpen(true)}>
        x
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Delete Recipe Modal"
      >
        <h2>{`Are you sure you want to delete this ${recipeName} recipe?`}</h2>
        <div className="modal-buttons">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setModalIsOpen(false)}>No!</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRecipe;
