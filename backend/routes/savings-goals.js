const express = require('express');
const router = express.Router();
const SavingsGoal = require('../models/SavingsGoal');

// Get all savings goals for a user
router.get('/', async (req, res) => {
  try {
    const savingsGoals = await SavingsGoal.find({ userId: req.user.id });
    res.json(savingsGoals);
  } catch (err) {
    res.status(500).send('Error fetching savings goals');
  }
});

// Add a new savings goal
router.post('/', async (req, res) => {
  const { name, targetAmount, deadline } = req.body;
  try {
    const newSavingsGoal = new SavingsGoal({ userId: req.user.id, name, targetAmount, deadline });
    await newSavingsGoal.save();
    res.status(201).json(newSavingsGoal);
  } catch (err) {
    res.status(500).send('Error creating savings goal');
  }
});

// Update a savings goal
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const savingsGoal = await SavingsGoal.findByIdAndUpdate(id, req.body, { new: true });
    res.json(savingsGoal);
  } catch (err) {
    res.status(404).send('Savings goal not found');
  }
});

// Delete a savings goal
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await SavingsGoal.findByIdAndDelete(id);
    res.status(204).send('Savings goal deleted');
  } catch (err) {
    res.status(404).send('Savings goal not found');
  }
});

module.exports = router;