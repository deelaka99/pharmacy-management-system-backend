const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authenticate = require("../middleware/authenticate");

// Query existing customers
router.get("/", medicationController.getAllMedications);

// Insert customer - Only owner can insert customers
router.post("/", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    medicationController.createMedication(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can insert customers" });
  }
});

// Update customer details - Only owner and managers can update customers
router.put("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    medicationController.updateMedication(req, res, next);
  } else {
    res
      .status(403)
      .json({ message: "Only the owner and managers can update customers" });
  }
});

// Soft delete customer record - Only owner and managers can soft delete customers
router.patch("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    medicationController.softDeleteMedication(req, res, next);
  } else {
    res.status(403).json({
      message: "Only the owner and managers can soft delete customers",
    });
  }
});

// Delete customer record - Only owner can permanently delete customers
router.delete("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    medicationController.deleteMedication(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can delete customers" });
  }
});

module.exports = router;
