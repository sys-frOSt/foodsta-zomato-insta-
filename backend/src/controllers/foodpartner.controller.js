const FoodPartnerModel = require('../models/foodpartner.model');
const FoodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
	try {
		const foodPartner = await FoodPartnerModel.findById(req.params.id);
		const foodItemsByFoodPartner = await FoodModel.find({ foodpartner: foodPartner._id });

		if (!foodPartner) {
			return res.status(404).json({ message: 'Food partner not found' });
		}

		const videos = await FoodModel.find({ foodpartner: req.params.id });

		return res.status(200).json({
			_id: foodPartner._id,
			name: foodPartner.name,
			address: foodPartner.address,
			totalMeals: videos.length,
			rating: foodPartner.rating || '0',
			videos,
		});
	} catch (error) {
		console.error('Error fetching food partner:', error);
		return res.status(500).json({ message: 'Error fetching food partner' });
	}
}

module.exports = {
	getFoodPartnerById,
};
