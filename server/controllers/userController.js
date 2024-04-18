const User = require('../models/User');
const Listing = require('../models/Listing');

exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ msg: 'Listing not found' });
        }

        if (user.favorites.includes(req.params.id)) {
            return res.status(400).json({ msg: 'Listing already in favorites' });
        }

        user.favorites.push(req.params.id);
        await user.save();

        res.json({ msg: 'Listing added to favorites' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Remove a property from user's favorites
exports.removeFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const listingIndex = user.favorites.indexOf(req.params.id);
        if (listingIndex === -1) {
            return res.status(400).json({ msg: 'Listing not found in favorites' });
        }

        user.favorites.splice(listingIndex, 1);
        await user.save();

        res.json({ msg: 'Listing removed from favorites' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get user's favorite properties
exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};