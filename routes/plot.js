const express = require("express");
const router = express.Router();

const Coordinate = require("../models/Coordinates");

router.post("/add-plot", async (req, res) => {
  try {
    const data = new Coordinate(req.body);
    const result = await data.save();
    return res.status(200).send({ data: result, message: "successfull" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

router.get("/get-plot", async (req, res) => {
  try {
    const result = await Coordinate.find({});
    return res.status(200).send({ data: result, message: "successfull" });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

module.exports = router;
