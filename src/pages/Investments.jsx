import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowUpIcon, ArrowDownIcon } from '../components/ui/Icons';
import { investmentService } from '../services/api';

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const response = await investmentService.getAllInvestments();
      setInvestments(response.data);
    } catch (err) {
      setError('Failed to fetch investments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddInvestment = async (newInvestment) => {
    try {
      const response = await investmentService.createInvestment(newInvestment);
      setInvestments([...investments, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      setError('Failed to create investment');
      console.error(err);
    }
  };

  const handleEditInvestment = async (updatedInvestment) => {
    try {
      const response = await investmentService.updateInvestment(updatedInvestment._id, updatedInvestment);
      setInvestments(investments.map(investment => 
        investment._id === updatedInvestment._id ? response.data : investment
      ));
      setEditingInvestment(null);
    } catch (err) {
      setError('Failed to update investment');
      console.error(err);
    }
  };

  const handleDeleteInvestment = async (id) => {
    if (window.confirm('Are you sure you want to delete this investment?')) {
      try {
        await investmentService.deleteInvestment(id);
        setInvestments(investments.filter(investment => investment._id !== id));
      } catch (err) {
        setError('Failed to delete investment');
        console.error(err);
      }
    }
  };

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const totalChange = investments.reduce((sum, inv) => sum + (inv.value * inv.change / 100), 0);
  const percentageChange = (totalChange / totalValue) * 100;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Investments</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Total Value: ${totalValue.toLocaleString()}
              <span className={`ml-2 inline-flex items-center ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {percentageChange >= 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
                {Math.abs(percentageChange).toFixed(2)}%
              </span>
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>Add Investment</Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {investments.map((investment) => (
            <Card key={investment._id}>
              <CardHeader>
                <CardTitle className="text-lg">{investment.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${investment.value.toLocaleString()}
                </p>
                <p className={`flex items-center ${investment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {investment.change > 0 ? (
                    <ArrowUpIcon className="mr-1" />
                  ) : (
                    <ArrowDownIcon className="mr-1" />
                  )}
                  {Math.abs(investment.change)}%
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingInvestment(investment)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteInvestment(investment._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Investment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                [Placeholder for pie chart]
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                [Placeholder for line chart]
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              No recent transactions
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Investments; 