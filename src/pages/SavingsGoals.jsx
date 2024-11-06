import React, { useState } from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';

const SavingsGoals = () => {
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      title: 'Save for a trip to Japan',
      targetAmount: 3000,
      currentAmount: 1500,
      deadline: '2024-12-31'
    },
    { 
      id: 2, 
      title: 'Buy a new car',
      targetAmount: 5000,
      currentAmount: 1000,
      deadline: '2024-12-31'
    }
  ]);

  const calculateProgress = (current, target) => {
    return (current / target) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <FaPlus className="text-sm" />
            Add Goal
          </button>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.map(goal => (
            <div key={goal.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{goal.title}</h2>
                  <p className="text-gray-600">
                    ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                  </p>
                </div>
                <button 
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="Edit goal"
                >
                  <FaEdit className="text-xl" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="relative pt-1">
                <div className="overflow-hidden h-3 rounded-full bg-gray-200">
                  <div 
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${calculateProgress(goal.currentAmount, goal.targetAmount)}%` }}
                  />
                </div>
              </div>

              {/* Goal Details */}
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Target Date: {new Date(goal.deadline).toLocaleDateString()}</span>
                <span>{calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}% Complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingsGoals; 