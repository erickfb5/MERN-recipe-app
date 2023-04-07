import { deleteRecipe } from "../api";

const DeleteRecipe = ({ recipeId }) => {
  return (
    <button
      className="delete-recipe"
      onClick={() => deleteRecipe(recipeId)}
    >
      x
    </button>
  );
};

export default DeleteRecipe;
