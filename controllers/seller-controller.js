const Seller = require('../models/Seller');

// Create seller
exports.createSeller = async (req, res) => {
    const { name, mobile, plotNumber } = req.body;
    if(!name || !mobile || !plotNumber) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newSeller = new Seller({
            name,
            mobile,
            plotNumber,
            societyName: 'Pak View City',
        });
        const savedSeller = await newSeller.save();
        res.status(201).json(savedSeller);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create seller' });
    }
};

// Update seller
exports.updateSeller = async (req, res) => {
    const { name, mobile, plotNumber } = req.body;
    if(!name || !mobile || !plotNumber) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.params.id,
            { name, mobile, plotNumber, societyName: 'Pak View City' }, // Enforce fixed society name
            { new: true }
        );
        if (!updatedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        res.status(200).json(updatedSeller);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update seller' });
    }
};

// Delete seller
exports.deleteSeller = async (req, res) => {
    try {
        const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
        if (!deletedSeller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete seller' });
    }
};

// Get seller by ID
exports.getSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch seller' });
    }
};

// Get all sellers
exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find().sort({ createdAt: -1 });
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sellers' });
    }
};
