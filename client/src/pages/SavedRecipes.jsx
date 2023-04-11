import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Spinner } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";

import { fetchSavedRecipes } from "../api";

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
        <Spinner />
      ) : (
        <ul>
          {savedRecipes.length === 0 ? (
            <h1>No recipes have been saved yet</h1>
          ) : (
            savedRecipes?.map((recipe) => (
              <li key={recipe._id}>
                <div>
                  <h2>{recipe.name}</h2>
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>

                <div className="ingredients">
                  <h4>Ingredients</h4>

                  {recipe?.ingredients.map((ingredient, index) => (
                    <p key={`${ingredient}-${index}`}>{ingredient}</p>
                  ))}
                </div>
                <div className="instructions">
                  <h4>Instructions</h4>
                  {recipe.instructions.split(".").map((instruction) => (
                    <p key={instruction}>{instruction}</p>
                  ))}
                </div>
                <div>
                  <h5>⏰ Cooking Time: {`${recipe.cookingTime} minutes`}</h5>
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
