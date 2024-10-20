import { useEffect, useState } from "react";
import API from "../services/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver';

const MyExpenses = () => {
  const {user} = useSelector(state => state.auth);
  const [showParticipants, setShowParticipants] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  console.log(user);
  const handleDownload = async () => {
    try{
      const response = await API.get(`/balance-sheet/${user._id}`,{
        responseType: 'blob',
      });
      console.log(response.data);
      if(response.data.status === "Success"){
        toast.success("Balance Sheet downloaded successfully");
      }

      const blobFile = response.data;
      saveAs(blobFile, 'BalanceSheet.csv');
    } catch(err){
      console.log(err);
    }
  }

  const fetchExpenses = async () => {
    try {
      const response = await API.post('/expense/my-expenses',{
        createdBy: user?.email
      });

      console.log(response.data);
      
      if(response.data.status === "Success") {
        toast.success("Expense fetched successfully");
        response.data.data.forEach((element) => {
          element.showParticipants = false;
        });
        console.log("here", response.data.data);
        setExpenseData(response.data.data);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetched expense");
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);
  
  return (
    <div className="">
      <div className="flex justify-between p-5">
        <h1 className="text-3xl font-medium">Your Expenses</h1>
        <button className="px-4 bg-blue-500 rounded-lg shadow-md" onClick={handleDownload}>Download Balance Sheet</button>
      </div>
      <div className="p-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenseData.map((item)=>(
          <div key={item._id} className="p-4 border-2 border-black rounded-lg bg-blue-200">
            <div className="flex justify-between text-xl">
              <p>{item.expenseTitle}</p>
              <p>Rs. {item.totalAmount}</p>
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={()=>{setShowParticipants(!showParticipants)}}>Show Participants</button>
            {showParticipants && (<div>
              <p className="text-lg">Participants:</p>
              {item.participants.map((participant)=>(
                <div key={participant._id} className="flex justify-between py-2 px-4 border-2 mt-2 border-black rounded-lg">
                  <p>{participant.email}</p>
                  {participant.user!==item.createdBy ? <p>Rs. {participant.amountOwed}</p> : <p>Paid</p>}
                </div>
              ))}
            </div>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyExpenses