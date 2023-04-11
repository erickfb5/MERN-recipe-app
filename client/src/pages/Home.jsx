import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FcClock, FcLike, FcLikePlaceholder } from "react-icons/fc";
import moment from "moment";

import { OverlayModal, Spinner } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";
import { fetchRecipe, fetchSavedRecipe, saveRecipe } from "../api";
import DeleteRecipe from "../components/DeleteRecipe";
import EditRecipe from "../components/EditRecipe";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const userId = useGetUserId();

  useEffect(() => {
    fetchRecipe(setRecipes, setLoading);
    userId
      ? fetchSavedRecipe(userId, setSavedRecipes)
      : toast.warning("User is not logged in.");
  }, [userId]);

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  const handleSaveRecipe = async (recipeId) => {
    try {
      setIsSaving(true);
      await saveRecipe(recipeId, userId, setSavedRecipes);
      setIsSaving(false);
    } catch (err) {
      console.error("Failed to save recipe. Please try again later.");
      console.error("custom:::", err);
    }
  };
  return (
    <>
      <ToastContainer />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Recipes</h2>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {recipes?.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <div className="recipe-name">
                    <FcLike className="heart-icon" />
                    <h2>{recipe.name}</h2>
                    {recipe.userOwner === userId && (
                      <div className="icons">
                        <DeleteRecipe
                          recipeId={recipe._id}
                          recipeName={recipe.name}
                          setRecipes={setRecipes}
                          setLoading={setLoading}
                        />
                        <EditRecipe
                          recipe={recipe}
                          setRecipes={setRecipes}
                          setLoading={setLoading}
                        />
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                  </div>
                </div>
                <div>
                  {userId && isRecipeSaved(recipe._id) ? (
                    <FcLikePlaceholder fontSize="20px" />
                  ) : (
                    <FcLike onClick={() => handleSaveRecipe(recipe._id)} />
                  )}
                </div>
                {/* // <button
                  // onClick={() => handleSaveRecipe(recipe._id)}
                  //   disabled={isSaving || isRecipeSaved(recipe._id)}
                  // >
                  //   {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                  // </button> */}
                <div className="ingredients">
                  <h4>Ingredients</h4>

                  {recipe?.ingredients.map((ingredient, index) => (
                    <p key={`${ingredient}-${index}`}>{ingredient}</p>
                  ))}
                </div>
                <div className="instructions">
                  <h4>Instructions</h4>
                  {recipe.instructions.split(".").map((instruction, index) => (
                    <p key={instruction + index}>{instruction}</p>
                  ))}
                </div>
                <div>
                  <h5>
                    <FcClock fontSize="15px" /> Cooking Time:{" "}
                    {`${recipe.cookingTime} minutes`}
                  </h5>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {`Created by ${
                        recipe.userOwner === userId ? "you" : recipe.createdBy
                      }`}
                    </p>
                    <p>{moment(recipe.createdAt).fromNow()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {isSaving && <OverlayModal message="Saving recipe" />}
      </div>
    </>
  );
};

export default Home;
