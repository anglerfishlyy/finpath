const axios = require('axios');

const apiKeys = {
  // Add your API keys here
  alphaVantage: 'YOUR_API_KEY',
  // Add more API keys as needed
};

const investmentService = {
  async getStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKeys.alphaVantage}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      throw new Error(`Error fetching stock data for ${symbol}`);
    }
  },

  async getPortfolioPerformance(portfolio) {
    // Implement logic to calculate portfolio performance
    // using the fetched stock data
  }
};

module.exports = investmentService;