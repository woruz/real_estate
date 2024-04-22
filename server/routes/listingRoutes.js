const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { authenticateJWT } = require('../middleware/authMiddleware');
const listingController = require('../controllers/listingController');

// @route   GET /api/listings
// @desc    Get all listings
// @access  Public
router.get('/',authenticateJWT, listingController.getListings);

// @route   GET /api/listings/particular/:id
// @desc    Get listing by ID
// @access  Public
router.get('/particular/:id',authenticateJWT, listingController.getListingById);

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private
router.post(
    '/',
    authenticateJWT,
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),
        check('price', 'Price is required').notEmpty(),
        check('location', 'Location is required').notEmpty(),
        check('type', 'Type is required').notEmpty(),
    ],
    listingController.createListing
);

// @route   PUT /api/listings/:id
// @desc    Update a listing
// @access  Private
router.post('/update/:id', authenticateJWT, listingController.updateListing);

// @route   DELETE /api/listings/:id
// @desc    Delete a listing
// @access  Private
router.post('/:id', authenticateJWT, listingController.deleteListing);

router.post('/contact/:id', authenticateJWT, listingController.contactListing);

module.exports = router;