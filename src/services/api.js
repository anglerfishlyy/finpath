import axios from 'axios';

// API URL based on environment
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://finpath-backend.onrender.com/api'  // This will be your Render.com backend URL
  : 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
});

// Add response interceptor for error logging
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - make sure your backend is running');
    } else {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

// Budget services
export const budgetService = {
  getAllBudgets: async () => {
    try {
      console.log('Fetching all budgets...');
      const response = await api.get('/budgets');
      console.log('Received budgets:', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching budgets:', error);
      throw error;
    }
  },
  createBudget: async (budgetData) => {
    try {
      console.log('Creating budget with data:', budgetData);
      const response = await api.post('/budgets', budgetData);
      console.log('Budget created:', response.data);
      return response;
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  },
  updateBudget: async (id, budgetData) => {
    try {
      const response = await api.put(`/budgets/${id}`, budgetData);
      return response;
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  },
  deleteBudget: async (id) => {
    try {
      const response = await api.delete(`/budgets/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting budget:', error);
      throw error;
    }
  }
};

// Expense services
export const expenseService = {
  getAllExpenses: () => api.get('/expenses'),
  createExpense: (expenseData) => api.post('/expenses', expenseData),
  updateExpense: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
};

// Investment services
export const investmentService = {
  getAllInvestments: () => api.get('/investments'),
  createInvestment: (investmentData) => api.post('/investments', investmentData),
  updateInvestment: (id, investmentData) => api.put(`/investments/${id}`, investmentData),
  deleteInvestment: (id) => api.delete(`/investments/${id}`),
};

export default api; 