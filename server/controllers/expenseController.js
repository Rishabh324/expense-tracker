const { Parser } = require("json2csv");
const expenseModel = require("../models/expenseModel");
const userModel = require("../models/userModel");

exports.addExpense = async (req,res) => {
    try {
        const { expenseTitle, totalAmount, createdBy, participants } = req.body;
        
        const user = await userModel.findOne({ email: createdBy });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        for(const item of participants) {
            const participant = await userModel.findOne({ email: item.email });
            if (!participant) {
                return res.status(404).json({
                    status: "failed",
                    message: `${email} not found`
                })
            }
            item.user = participant._id;
        }

        const expense = await expenseModel.create({
            expenseTitle,
            totalAmount,
            createdBy: user?._id,
            participants
        });

        res.status(201).json({
            status: "Success",
            message: "Expense added successfully.",
            expense
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at addExpense API",
            err
        })
    }
}

exports.getExpenses = async (req,res) => {
    try{
        const user = await userModel.findOne({ email: req.body.createdBy });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        const data = await expenseModel.find({ createdBy: user._id });

        res.status(200).json({
            status: "Success",
            message: "Expenses fetched successfully.",
            data
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at getExpenses API",
            err
        })
    }
};

exports.downloadBalanceSheet = async(req,res) => {
    try {
        // Find all expenses where the user is involved
        const id = req.params.id;
        const expenses = await expenseModel.find({})
            .populate('createdBy')
            .populate('participants.user');
        
        let totalOwedByUser = 0;
        let totalOwedToUser = 0;
        const balanceSheet = [];
    
        expenses.forEach((expense) => {
            const participant = expense.participants.find((p) => p.user._id.toString() === id);
            
            if (participant) {
                if (expense.createdBy._id.toString() === id) {
                // If the user created the expense, calculate what others owe them
                expense.participants.forEach((p) => {
                    if (p.user._id.toString() !== id) {
                    totalOwedToUser += p.amountOwed;
                    balanceSheet.push({
                        expenseTitle: expense.expenseTitle,
                        owes: p.user.email,
                        amount: p.amountOwed,
                        type: 'Owed to User',
                    });
                    }
                });
                } else {
                // If the user did not create the expense, calculate what they owe others
                    totalOwedByUser += participant.amountOwed;
                    balanceSheet.push({
                        expenseTitle: expense.expenseTitle,
                        owes: expense.createdBy.email,
                        amount: participant.amountOwed,
                        type: 'Owed by User',
                    });
                }
            }
            console.log(expense);
        });
    
        // Convert the balance sheet to CSV
        const fields = ['expenseTitle', 'owes', 'amount', 'type'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(balanceSheet);
    
        // Set headers for file download
        res.header('Content-Type', 'text/csv');
        res.attachment(`balance_sheet_${id}.csv`);
        return res.send(csv);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}