const Investment = require('../models/Investment');

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createInvestment = async (req, res) => {
  try {
    const investment = new Investment(req.body);
    const newInvestment = await investment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.json(investment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    res.json({ message: 'Investment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 