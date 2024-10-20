import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import API from "../services/API";

const AddExpense = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [splitMethod, setSplitMethod] = useState('Equal');
  const [participants, setParticipants] = useState([{ id: Date.now(), email: '', amountOwed: '' }]);

  const calculateSplit = () => {
    if (splitMethod === 'Equal') {
      // Equal Split
      const equalAmount = totalAmount / participants.length;
      const newParticipants = participants.map((p) => ({ ...p, amountOwed: equalAmount }));
      setParticipants(newParticipants);

    } else if (splitMethod === 'Exact') {
      // Exact Split (Amounts already entered by user)
      const total = participants.reduce((sum, p) => sum + Number(p.amountOwed), 0);
      if (total !== Number(totalAmount)) {
        toast.error('Exact amounts do not add up to the total amount');
        return;
      }

    } else if (splitMethod === 'Percentage') {
      // Percentage Split
      const totalPercentage = participants.reduce((sum, p) => sum + Number(p.amountOwed), 0);
      if (totalPercentage !== 100) {
        toast.error('Percentages do not add up to 100');
        return;
      }
      const newParticipants = participants.map((p) => ({
        ...p,
        amountOwed: (totalAmount * p.amountOwed) / 100,
      }));
      console.log("dsfsdf", newParticipants);
      setParticipants(newParticipants);
    }
  };

  const { user } = useSelector(state => state.auth);

  const addParticipant = () => {
    setParticipants([...participants, { id: Date.now(), email: '', amountOwed: '' }]);
  };

  const removeParticipant = (id) => {
    if (participants.length === 1) {
      toast.warning("Cannot remove all participants");
      return;
    }
    setParticipants(participants.filter(item => item.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const updatedParticipants = participants.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setParticipants(updatedParticipants);
  };

  const validate = () => {
    if (!expenseTitle || !totalAmount) {
      toast.warning("Please fill all fields");
      return false;
    }
    
    let sum = 0;
    const cnt = {};
    for (const item of participants) {
      if(cnt[item.email]) {
        toast.error("Duplicate email not allowed");
        return false;
      }
      else cnt[item.email] = 1;
      
      if (!item.email || !item.amountOwed) {
        toast.warning("Please fill all fields");
        return false;
      }
      sum=parseInt(sum)+parseInt(item.amountOwed);
    }
    console.log(sum, totalAmount);
    if(sum !== parseInt(totalAmount)) {
      toast.warning("Total amount and sum of participant's amount should be equal");
      return false;
    }

    return true;
  }

  const handleAddExpense = async () => {
    try{
      let validation = validate();
      console.log(participants);
      if(validation){
        const response = await API.post('/expense/add-expense', {
          expenseTitle,
          totalAmount,
          createdBy: user?.email,
          participants
        });
  
        console.log(response.data);
  
        if(response.data.status === "Success") {
          toast.success("Expense added successfully");
          setExpenseTitle("");
          setTotalAmount("");
          setParticipants([{ id: Date.now(), email: '', amountOwed: '' }]);
        }
        else{
          toast.error("Failed to add expense");
        }
      }
    }catch(err) {
      console.log(err);
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl text-center">Add Expense</h1>
      <form className="p-4" onSubmit={(e) => {
        e.preventDefault();
        calculateSplit();
        console.log("passing");
        handleAddExpense();
      }}>
        <div>
          <label htmlFor="title" className="block">Title:</label>
          <input
            type="text"
            placeholder="Enter Title"
            name="title"
            id="title"
            value={expenseTitle}
            onChange={(e) => setExpenseTitle(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block">Amount:</label>
          <input
            type="text"
            placeholder="Enter Amount"
            name="amount"
            id="amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div className="flex gap-5 mt-2">
          <label htmlFor="split" className="block">Method:</label>
          <div className="inline-flex">
            <input
              type="radio"
              name="split"
              id="split"
              value="Equal"
              onChange={(e) => setSplitMethod(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
            <p>Equal</p>
          </div>
          <div className="inline-flex">
            <input
              type="radio"
              name="split"
              id="split"
              value="Exact"
              onChange={(e) => setSplitMethod(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
            <p>Exact</p>
          </div>
          <div className="inline-flex">
            <input
              type="radio"
              name="split"
              id="split"
              value="Percentage"
              onChange={(e) => setSplitMethod(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-lg"
            />
            <p>Percentage</p>
          </div>
        </div>
        <label>Participants:</label>
        {participants.map((item, index) => (
          <div key={item.id} className="flex items-center mb-4">
            <input
              type="text"
              value={item.email}
              id="email"
              name="email"
              placeholder={`Enter participant ${index + 1} email`}
              onChange={(e) => handleInputChange(item.id, e.target.id, e.target.value)}
              className="w-full p-2 border border-green-300 rounded-md mr-2"
            />
            {splitMethod!=="Equal" && <input
              type="text"
              value={item.amount}
              id="amountOwed"
              name="amountOwed"
              placeholder={`Enter ${splitMethod==="Exact" ? "amount": "percentage"} `}
              onChange={(e) => handleInputChange(item.id, e.target.id, e.target.value)}
              className="w-full p-2 border border-green-300 rounded-md mr-2"
            />}
            <button
              onClick={() => removeParticipant(item.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={()=>addParticipant()}
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
        >
          Add Participant
        </button>
        <div>
          <button type="submit" className="p-2 bg-blue-500 mt-2 rounded-lg shadow-md">
            Add Expense
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddExpense