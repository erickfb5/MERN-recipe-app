import { useEffect, useState } from "react";
import axios from "axios";

import { Spinner } from "../components";
import { useGetUserID } from "../hooks/useGetUserID";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Recipes</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>

              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {`${recipe.cookingTime} minutes`}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
