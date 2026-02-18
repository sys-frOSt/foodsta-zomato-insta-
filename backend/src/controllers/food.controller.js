const storageService = require("../services/storage.service");
const FoodModel = require("../models/food.model"); // if you are using MongoDB

// const Food = require("../models/food.model"); // if you are using MongoDB

const createFood = async (req, res) => {
  try {
    // 1️⃣ Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    // 2️⃣ Upload to ImageKit
    const uploadResult = await storageService.uploadFile(
      req.file.buffer,
      `${Date.now()}-${req.file.originalname}`
    );

    // 3️⃣ Food object (example)
    const foodData = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: uploadResult.url,
      imageId: uploadResult.fileId,
    };
    console.log(foodData);
 
    const foodItem = new FoodModel({
      name: foodData.name,
      description: foodData.description,
      video: foodData.imageUrl,
      foodpartner: req.foodPartner.id // Corrected: capital P to match middleware
    });
    await foodItem.save();
 
    // 4️⃣ Save to DB (optional)
    // const food = await FoodModel.create(foodData);

    // 5️⃣ Response
    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: foodData, // or food
    });
  } catch (error) {
    console.error("Create Food Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create food",
      error: error.message,
    });
  }
};

async function getAllFoodItems(req, res) {
  const foodItems=await FoodModel.find({})
  res.status(200).json({
    message:"food items fetch successfully",
    foodItems
  })
}

module.exports = {
  createFood,
  getAllFoodItems}