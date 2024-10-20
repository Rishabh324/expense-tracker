const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseTitle: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    amountOwed: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  }],
});

module.exports = mongoose.model('Expense', expenseSchema);

