import { useEffect, useState } from "react";
import moment from "moment";

import { OverlayModal, Spinner } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";
import { fetchRecipe, fetchSavedRecipe, saveRecipe } from "../api/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const userId = useGetUserId();

  useEffect(() => {
    fetchRecipe(setRecipes, setLoading);
    fetchSavedRecipe(userId, setSavedRecipes);
  }, [userId]);

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  const handleSaveRecipe = async (recipeId) => {
    try {
      setIsSaving(true);
      await saveRecipe(recipeId, userId, setSavedRecipes);
    } catch (error) {
      console.error("Failed to save recipe. Please try again later.");
    }
    setIsSaving(false);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Recipes</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {recipes?.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
              {userId && (
                <button
                  onClick={() => handleSaveRecipe(recipe._id)}
                  disabled={isSaving || isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              )}
              <div className="ingredients">
                <h4>Ingredients</h4>

                {recipe?.ingredients.map((ingredient, index) => (
                  <p key={`${ingredient}-${index}`}>{ingredient}</p>
                ))}
              </div>
              <div className="instructions">
                <h4>Instructions</h4>
                {recipe?.instructions.map((instruction, index) => (
                  <p key={`${instruction}-${index}`}>{instruction}</p>
                ))}
              </div>
              <div>
                <h5>⏰ Cooking Time: {`${recipe.cookingTime} minutes`}</h5>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {recipe.createdBy && (
                    <>
                    <p>
                      Created by: {recipe.createdBy}{" "}
                    </p>
                      <p>
                      {moment(recipe.createdAt).fromNow()}
                    </p>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {isSaving && <OverlayModal message='Saving recipe'/>}
    </div>
  );
};

export default Home;