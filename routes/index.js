const express = require("express");
const router = express.Router();

router.use('/users', require('./users'));
router.use('/sellers', require('./seller'));

module.exports = router;