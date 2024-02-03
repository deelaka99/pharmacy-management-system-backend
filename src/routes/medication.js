const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authenticate = require("../middleware/authenticate");

// Query existing medications
router.get("/", medicationController.getAllMedications);

// Insert meeication - Only owner can insert medications
router.post("/", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    medicationController.createMedication(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can insert medications" });
  }
});

// Update meeication details - Only owner and managers can update medications
router.put("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    medicationController.updateMedication(req, res, next);
  } else {
    res
      .status(403)
      .json({ message: "Only the owner and managers can update medications" });
  }
});

// Soft delete meeication record - Only owner and managers can soft delete medications
router.patch("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    medicationController.softDeleteMedication(req, res, next);
  } else {
    res.status(403).json({
      message: "Only the owner and managers can soft delete medications",
    });
  }
});

// Delete meeication record - Only owner can permanently delete medications
router.delete("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    medicationController.deleteMedication(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can delete medications" });
  }
});

module.exports = router;
