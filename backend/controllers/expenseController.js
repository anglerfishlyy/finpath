const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    console.log('Creating expense with data:', req.body);
    
    const expense = new Expense({
      description: req.body.description,
      amount: req.body.amount,
      category: req.body.category,
      date: new Date(req.body.date)
    });

    const savedExpense = await expense.save();
    console.log('Successfully saved expense:', savedExpense);
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error('Error saving expense to database:', error);
    res.status(400).json({ 
      message: error.message,
      details: error
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, date: new Date(req.body.date) }, 
      { new: true }
    );
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 