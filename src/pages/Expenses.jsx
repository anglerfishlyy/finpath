import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { expenseService } from '../services/api';
import { format } from 'date-fns';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await expenseService.getAllExpenses();
      setExpenses(response.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    }
  };

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await expenseService.createExpense(newExpense);
      setExpenses([...expenses, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      console.error('Failed to create expense:', err);
    }
  };

  const handleEditExpense = async (updatedExpense) => {
    try {
      const response = await expenseService.updateExpense(updatedExpense._id, updatedExpense);
      setExpenses(expenses.map(expense => 
        expense._id === updatedExpense._id ? response.data : expense
      ));
      setEditingExpense(null);
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await expenseService.deleteExpense(id);
        setExpenses(expenses.filter(expense => expense._id !== id));
      } catch (err) {
        console.error('Failed to delete expense:', err);
      }
    }
  };

  const filteredExpenses = filterCategory === 'all'
    ? expenses
    : expenses.filter(expense => expense.category === filterCategory);

  const categories = [...new Set(expenses.map(expense => expense.category))];
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Expenses</h1>
          <Button onClick={() => setIsFormOpen(true)}>Add Expense</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${totalExpenses.toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(totalExpenses / expenses.length).toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {expenses.length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => setEditingExpense(expense)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Form Modal */}
        {(isFormOpen || editingExpense) && (
          <ExpenseForm
            onClose={() => {
              setIsFormOpen(false);
              setEditingExpense(null);
            }}
            onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
            expense={editingExpense}
          />
        )}
      </main>
    </div>
  );
};

export default Expenses;