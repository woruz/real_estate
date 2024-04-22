const Listing = require('../models/Listing');

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
exports.getListings = async (req, res) => {
    try {
        let query = {};
        console.log({hello: req.query})
        // Apply filters if provided
        if (req.query.location) {
            query.location = { $regex: new RegExp(req.query.location, 'i') };
        }
        if (req.query.minPrice && !req.query.maxPrice) {
            query.price = { $gte: req.query.minPrice };
        }
        if (!req.query.minPrice && req.query.maxPrice) {
            query.price = { $lte: req.query.maxPrice };
        }
        if (req.query.minPrice && req.query.maxPrice) {
            query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
        }
        if (req.query.type) {
            query.type = { $regex: new RegExp(req.query.type, 'i') };
        }
        // Add more filters as needed

        const listings = await Listing.find(query);

        res.json({success: true, response: listings});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, response: "Server error"});
    }
};

// @desc    Get listing by ID
// @route   GET /api/listings/:id
// @access  Public
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }
        res.json({success: true, response: listing});
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({success: false, message: 'Listing not found' });
        }
        res.status(500).json({success: false, response: "Server error"});
    }
};

// @desc    Create a new listing
// @route   POST /api/listings
// @access  Private
exports. createListing = async (req, res) => {
    const { title, description, price, location, type } = req.body;

    try {
        const newListing = new Listing({
            title,
            description,
            price,
            location,
            type,
            owner_id: req.user.id
        });

        const listing = await newListing.save();
        res.json({success: true, response: listing});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, response: "Server error"});
    }
};

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
exports.updateListing = async (req, res) => {
    const { title, description, price, location, type } = req.body;

    // Build listing object
    const listingFields = {};
    if (title) listingFields.title = title;
    if (description) listingFields.description = description;
    if (price) listingFields.price = price;
    if (location) listingFields.location = location;
    if (type) listingFields.type = type;

    console.log({listingFields})

    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        listing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: listingFields },
            { new: true }
        );

        res.json(listing);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
exports.deleteListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        await Listing.findByIdAndUpdate({_id: req.params.id}, {isDeleted: true});

        res.json({success: true, message: 'Listing removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, response: "Server error"});
    }
};