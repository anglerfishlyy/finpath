import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Progress from '../components/ui/Progress';
import BudgetForm from '../components/Budget/BudgetForm';
import { budgetService } from '../services/api';

const Budgeting = () => {
  const [budgets, setBudgets] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch budgets on component mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await budgetService.getAllBudgets();
      setBudgets(response.data);
    } catch (err) {
      setError('Failed to fetch budgets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = async (newBudget) => {
    try {
      console.log('Sending budget data:', newBudget);
      const response = await budgetService.createBudget({
        ...newBudget,
        spent: 0,
        color: `bg-${['blue', 'green', 'yellow', 'purple', 'pink', 'orange'][budgets.length % 6]}-500`
      });
      console.log('Response from server:', response);
      setBudgets([...budgets, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error creating budget:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to create budget');
    }
  };

  const handleEditBudget = async (updatedBudget) => {
    try {
      const response = await budgetService.updateBudget(updatedBudget._id, updatedBudget);
      setBudgets(budgets.map(budget => 
        budget._id === updatedBudget._id ? response.data : budget
      ));
      setEditingBudget(null);
    } catch (err) {
      setError('Failed to update budget');
      console.error(err);
    }
  };

  const handleDeleteBudget = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetService.deleteBudget(id);
        setBudgets(budgets.filter(budget => budget._id !== id));
      } catch (err) {
        setError('Failed to delete budget');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Budgets</h1>
          <Button onClick={() => setIsFormOpen(true)}>Create New Budget</Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.amount) * 100);
            
            return (
              <Card key={budget._id}>
                <CardHeader>
                  <CardTitle>{budget.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
                    </span>
                    <span className={`text-sm font-medium ${
                      percentage >= 90 ? 'text-red-600' :
                      percentage >= 75 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={percentage}
                  />
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Remaining: ${(budget.amount - budget.spent).toLocaleString()}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingBudget(budget)}
                        className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteBudget(budget._id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Budget Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${budgets.reduce((sum, budget) => sum + budget.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${budgets.reduce((sum, budget) => sum + budget.spent, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${budgets.reduce((sum, budget) => sum + (budget.amount - budget.spent), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Budget Form Modal */}
        {(isFormOpen || editingBudget) && (
          <BudgetForm
            onClose={() => {
              setIsFormOpen(false);
              setEditingBudget(null);
            }}
            onSubmit={editingBudget ? handleEditBudget : handleAddBudget}
            budget={editingBudget}
          />
        )}
      </main>
    </div>
  );
};

export default Budgeting; 