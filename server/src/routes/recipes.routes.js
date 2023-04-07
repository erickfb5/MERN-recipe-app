import express from "express";
import { recipeModel, userModel } from "../models/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await recipeModel.find({});
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching recipes." });
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = new recipeModel(req.body);
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating recipe." });
  }
});

router.put("/", async (req, res) => {
  try {
    const { recipeId, userId } = req.body;
    const recipe = await recipeModel.findById(recipeId);
    const user = await userModel.findById(userId);

    if (!recipe || !user) {
      return res.status(404).json({ message: "Recipe or user not found." });
    }

    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving recipe." });
  }
});

router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching saved recipes." });
  }
});

router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    res.json({ savedRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching saved recipes." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found." });
    }
    await recipe.deleteOne();
    res.json({ message: "Recipe deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting recipe." });
  }
});


export { router as recipesRouter };
