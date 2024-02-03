// routes/customer.js

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authenticate = require("../middleware/authenticate");

// Query existing customers
router.get("/", authenticate, customerController.getAllCustomers);

// Insert customer - Only owner can insert customers
router.post("/", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    customerController.createCustomer(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can insert customers" });
  }
});

// Update customer details - Only owner and managers can update customers
router.put("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    customerController.updateCustomer(req, res, next);
  } else {
    res
      .status(403)
      .json({ message: "Only the owner and managers can update customers" });
  }
});

// Soft delete customer record - Only owner and managers can soft delete customers
router.patch("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner" || req.user.role === "manager") {
    customerController.softDeleteCustomer(req, res, next);
  } else {
    res
      .status(403)
      .json({
        message: "Only the owner and managers can soft delete customers",
      });
  }
});

// Delete customer record - Only owner can permanently delete customers
router.delete("/:id", authenticate, (req, res, next) => {
  if (req.user.role === "owner") {
    customerController.deleteCustomer(req, res, next);
  } else {
    res.status(403).json({ message: "Only the owner can delete customers" });
  }
});

module.exports = router;
