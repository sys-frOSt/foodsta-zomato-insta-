const express = require('express');
const FoodPartnerModel = require('../models/foodpartner.model');
const FoodModel = require('../models/food.model');
const router = express.Router();

// Get food partner profile by ID with their videos
router.get('/:id', async (req, res) => {
  try {
    const foodPartner = await FoodPartnerModel.findById(req.params.id);
    
    if (!foodPartner) {
      return res.status(404).json({ message: 'Food partner not found' });
    }

    // Get all videos/food items created by this food partner
    const videos = await FoodModel.find({ foodpartner: req.params.id });

    return res.status(200).json({
      _id: foodPartner._id,
      name: foodPartner.name,
      address: foodPartner.address,
      totalMeals: videos.length,
      rating: foodPartner.rating || '0',
      videos: videos,
    });
  } catch (error) {
    console.error('Error fetching food partner:', error);
    return res.status(500).json({ message: 'Error fetching food partner' });
  }
});

module.exports = router;
