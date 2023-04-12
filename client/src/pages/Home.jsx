import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { FcClock } from "react-icons/fc";
import { FaStar } from "react-icons/fa";
import moment from "moment";

import { DeleteRecipe, EditRecipe, OverlayModal, Spinner } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";
import {
  deleteSavedRecipe,
  fetchRecipe,
  fetchSavedRecipe,
  saveRecipe,
} from "../api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await saveRecipe(recipeId, userId, setSavedRecipes);
      setLoading(false);
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
        <h2>Recipes Feed</h2>
        {loading ? (
          <ClockLoader speedMultiplier={2} />
        ) : (
          <ul>
            {recipes?.map((recipe) => (
              <li key={recipe._id}>
                <div className="recipe-name">
                  <div className="icons" style={{ visibility: "visible" }}>
                    {userId && isRecipeSaved(recipe._id) ? (
                      <FaStar
                        className="star-icon"
                        color="rgba(194, 133, 10, 0.27)"
                        onClick={() =>
                          deleteSavedRecipe(
                            recipe._id,
                            userId,
                            setSavedRecipes,
                            setLoading
                          )
                        }
                      />
                    ) : userId && !isRecipeSaved(recipe._id) ? (
                      <FaStar
                        className="star-icon"
                        color="rgb(255, 217, 0)"
                        onClick={() => handleSaveRecipe(recipe._id)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <h2>{recipe.name}</h2>
                  <div className="icons" style={{ visibility: "visible" }}>
                    {recipe.userOwner === userId && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>

                <div></div>
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
      </div>
    </>
  );
};

export default Home;
