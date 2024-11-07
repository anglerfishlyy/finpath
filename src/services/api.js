import axios from 'axios';

// API URL based on environment
const API_URL = import.meta.env.MODE === 'production'
  ? 'https://finpath-backend.onrender.com/api'  // Your Render.com backend URL
  : 'http://localhost:10000/api';

// Create axios instance with longer timeout
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,  // Increased timeout to 30 seconds for slow cold starts
  withCredentials: true  // Add this line
});

// Add better error logging
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers
    });
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