const express = require('express');
const router = express.Router();

// Import the controller
const userController = require('../controllers/userController');

// Define routes
router.post('/bfhl', userController.processData);

router.get('/bfhl', userController.getOperationCode)

module.exports = router;
