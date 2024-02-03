const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Query existing customers
router.get('/', customerController.getAllCustomers);

// Insert customer
router.post('/', customerController.createCustomer);

// Update customer details
router.put('/:id', customerController.updateCustomer);

// Soft delete customer record
router.patch('/:id', customerController.softDeleteCustomer);

// Delete customer record
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
