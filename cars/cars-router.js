const express = require("express");

const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await db("cars");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve cars" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const car = await db("cars").where({ id });
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: "car not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to retrieve car" });
  }
});

router.post("/", async (req, res) => {
  try {
    const carData = req.body;
    const [id] = await db("cars").insert(carData);
    const newCar = await db("cars").where({ id });
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Failed to store data" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db("cars").remove({ id });
    if (deleted) {
      res.status(200).json({ message: "the post has been deleted" });
    } else {
      res.status(404).json({ message: "that car doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting car" });
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { vin, make, model, mileage, transmissionType, titleStatus } = req.body;
  try {
    const updated = await db("cars").get(id);
    if (!vin || !make || !model || !mileage) {
      res.status(400).json({ message: "please provide all required fields" });
    } else {
      await db("cars").update(id, req.body);
      res.status(200).json(updated);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating car" });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const deleted = await db("cars").get(id);
    if (deleted) {
      await db("cars").remove(id);
      res.status(200).json({ message: "the car has been deleted" });
    } else {
      res.status(404).json({ message: "that car does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "error deleting" });
  }
});

module.exports = router;
