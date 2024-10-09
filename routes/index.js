const express = require("express");
const router = express.Router();

router.use('/users', require('./users'));
router.use('/plots', require('./plot'));

module.exports = router;