import express from "express";
import foodmodel from "../models/foodModel.js";
import fs from "fs";

//add food
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodmodel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  console.log("its here", food);
  try {
    await food.save();
    console.log("Food item saved successfully");
    res.status(201).json({ message: "Food item added successfully", food });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to add food item", error: error.message });
  }
};
//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodmodel.find();
    res.status(200).json({ message: "success", data: foods });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch food items", error: error.message });
  }
};
//remove food item
const removeFood = async (req, res) => {
  const foodId = req.params.id;
  try {
    const foodItem = await foodmodel.findByIdAndDelete(foodId);
    fs.unlink(`uploads/${foodItem.image}`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }
      console.log("File deleted successfully:");
    });
    res.status(202).json({ message: "Success delete food item", foodItem });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete food item", error: error.message });
  }
};
export { addFood, listFood, removeFood };
