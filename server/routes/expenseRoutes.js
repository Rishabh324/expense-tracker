const express = require("express");
const router = express.Router();

const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');
//routes
router
    .route('/add-expense')
    .post(authMiddleware, expenseController.addExpense);

router
    .route('/my-expenses')
    .post(authMiddleware, expenseController.getExpenses);

router
    .route('/:id')
    .get(authMiddleware, expenseController.downloadBalanceSheet); 

module.exports = router;