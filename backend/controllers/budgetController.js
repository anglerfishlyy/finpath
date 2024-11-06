const Budget = require('../models/Budget');

// Get all budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    console.log('Retrieved budgets:', budgets);
    res.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new budget
exports.createBudget = async (req, res) => {
  try {
    console.log('Received budget data:', req.body);
    
    // Create budget without requiring userId for now
    const budget = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      spent: req.body.spent || 0,
      color: req.body.color || 'bg-blue-500'
    });

    const newBudget = await budget.save();
    console.log('Successfully created budget:', newBudget);
    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(400).json({ 
      message: error.message,
      details: error
    });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    console.log('Updating budget:', req.params.id, req.body);
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    console.log('Successfully updated budget:', budget);
    res.json(budget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    console.log('Deleting budget:', req.params.id);
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    console.log('Successfully deleted budget:', budget);
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ message: error.message });
  }
}; 