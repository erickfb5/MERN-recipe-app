import { useEffect, useState } from "react";
import axios from "axios";

import { Spinner } from "../components";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );

        console.log('response', response.data)
        setSavedRecipes(response.data.savedRecipes);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div>
      <h2>Saved Recipes</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul>
          {savedRecipes.map((recipe) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedRecipes;
