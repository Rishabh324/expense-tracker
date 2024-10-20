const { Parser } = require("json2csv");
const expenseModel = require("../models/expenseModel");
const userModel = require("../models/userModel");

exports.addExpense = async (req,res) => {
    try {
        const { expenseTitle, totalAmount, createdBy, participants } = req.body;
        
        // validating the user
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

        // adding the expense to the database
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

        //validating the user
        const user = await userModel.findOne({ email: req.body.createdBy });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        // fetching the expenses created by the user
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
        
        const id = req.params.id;
        // retrieving the transaction where specified  user is involved
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

        // parsing the data to csv format
    
        const fields = ['expenseTitle', 'owes', 'amount', 'type'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(balanceSheet);

        // specifying the type of response and attaching the file to be downloaded

        res.header('Content-Type', 'text/csv');
        res.attachment(`balance_sheet_${id}.csv`);
        return res.send(csv);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}