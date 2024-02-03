const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');

// Query existing customers
router.get('/', medicationController.getAllMedications);

// Insert customer
router.post('/', medicationController.createMedication);

// Update customer details
router.put('/:id', medicationController.updateMedication);

// Soft delete customer record
router.patch('/:id', medicationController.softDeleteMedication);

// Delete customer record
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
