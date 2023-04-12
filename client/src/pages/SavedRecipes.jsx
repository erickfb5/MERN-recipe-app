import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import moment from "moment";

import { DeleteRecipe, EditRecipe } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";
import { deleteSavedRecipe,fetchSavedRecipes } from "../api";
import { ClockLoader } from "react-spinners";


const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useGetUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }

    fetchSavedRecipes(userId, setSavedRecipes, setLoading);
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Saved Recipes</h2>
      {loading ? (
        <ClockLoader />
      ) : (
        <ul>
          {savedRecipes.length === 0 ? (
            <h1>No recipes have been saved yet</h1>
          ) : (
            savedRecipes?.map((recipe) => (
              <li key={recipe._id}>
                <div className="recipe-name">
                  <div className="icons" style={{ visibility: "visible" }}>
                    <FaStar
                      className="star-icon"
                      color="rgba(194, 133, 10, 0.27)"
                      onClick={() =>
                          deleteSavedRecipe(recipe._id, userId, setSavedRecipes, setLoading)
                      }
                    />
                  </div>
                  <h2>{recipe.name}</h2>
                  <div className="icons" style={{ visibility: "visible" }}>
                    {recipe.userOwner === userId && (
                      <>
                        <DeleteRecipe
                          recipeId={recipe._id}
                          recipeName={recipe.name}
                          setRecipes={setSavedRecipes}
                          setLoading={setLoading}
                        />
                        <EditRecipe
                          recipe={recipe}
                          setRecipes={setSavedRecipes}
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

                  {recipe?.ingredients?.map((ingredient, index) => (
                    <p key={`${ingredient}-${index}`}>{ingredient}</p>
                  ))}
                </div>
                <div className="instructions">
                  <h4>Instructions</h4>
                  {recipe?.instructions
                    ?.split(".")
                    .map((instruction, index) => (
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
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
