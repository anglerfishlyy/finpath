const express = require('express');
const router = express.Router();
const axios = require('axios');
const investmentService = require('../services/investment-service');

// Get stock data for a given symbol
router.get('/stock-data/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const data = await investmentService.getStockData(symbol);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching stock data');
  }
});

// Get portfolio performance
router.get('/portfolio-performance', async (req, res) => {
  const portfolio = req.user.portfolio;
  try {
    const performance = await investmentService.getPortfolioPerformance(portfolio);
    res.json(performance);
  } catch (err) {
    res.status(500).send('Error calculating portfolio performance');
  }
});

module.exports = router;