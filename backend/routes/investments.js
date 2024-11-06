const express = require('express');
const router = express.Router();
const {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment
} = require('../controllers/investmentController');

router.route('/')
  .get(getInvestments)
  .post(createInvestment);

router.route('/:id')
  .put(updateInvestment)
  .delete(deleteInvestment);

module.exports = router; 