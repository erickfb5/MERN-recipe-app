import { useEffect, useState } from "react";
import axios from "axios";

import { Spinner } from "../components";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { fetchSavedRecipes } from "../api/api";

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
                </div>

                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
                <p>Cooking Time: {`${recipe.cookingTime} minutes`}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
