const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();
const multer = require('multer');

const upload=multer({
    storage:multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 } // 500MB max file size
})


//api to create food item(protected route )
router.post('/', 
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('video'),
     foodController.createFood);
//api to get all food items[protected route]
router.get('/',authMiddleware.authUserMiddleware,
    foodController.getAllFoodItems);

module.exports = router;