const express = require('express');
const {
    createSeller,
    updateSeller,
    deleteSeller,
    getSeller,
    getAllSellers
} = require('../controllers/seller-controller');

const router = express.Router();

// Create seller
router.post('/create', createSeller);

// Update seller
router.put('/update/:id', updateSeller);

// Delete seller
router.delete('/delete/:id', deleteSeller);

// Get seller by ID
router.get('/:id', getSeller);

// Get all sellers
router.get('/', getAllSellers);

module.exports = router;