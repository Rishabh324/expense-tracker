import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useScreen } from "../context/ScreenContext";

const Sidebar = () => {
    const { isMobile, sidebarOpen } = useScreen();
    
    const logoutHandler = () => {
        localStorage.clear();
        toast.success("Logout Successful.");
    }

    return (
        <div className={`${isMobile && !sidebarOpen ? "hidden": ""} ${isMobile && sidebarOpen ? "absolute lay w-5/12": ""} min-w-fit w-3/12 p-6 flex flex-col justify-between bg-blue-200`}>
            <div className="flex flex-col">
                <Link to='/' className="p-3">Profile</Link>
                <Link to='/add-expense' className="p-3">Add Expense</Link>
                <Link to='/my-expenses' className="p-3">My Expenses</Link>
            </div>
            <Link to='/login' className="p-3 bg-red-500 rounded-lg border-black border-2" onClick={logoutHandler}>Logout</Link>
        </div>
    )
}

export default Sidebar;