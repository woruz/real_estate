// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// @route   POST /api/users/favorites/:id
// @desc    Add a property to user's favorites
// @access  Private
router.post('/favorites/:id', authenticateJWT, userController.addFavorite);

// @route   DELETE /api/users/favorites/:id
// @desc    Remove a property from user's favorites
// @access  Private
router.delete('/favorites/:id', authenticateJWT, userController.removeFavorite);

// @route   GET /api/users/favorites
// @desc    Get user's favorite properties
// @access  Private
router.get('/favorites', authenticateJWT, userController.getFavorites);

module.exports = router;