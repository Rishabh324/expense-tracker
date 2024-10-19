import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useScreen } from "../context/ScreenContext";

const Sidebar = () => {
    // const { isMobile, toggleSidebar, sidebarOpen } = useScreen();
    // const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.clear();
        toast.success("Logout Successful.");
    }

    return (
        <div className="min-w-fit w-3/12 p-6 flex flex-col bg-blue-200">
            <Link to='/' className="p-3">Profile</Link>
            <Link to='/add-expense' className="p-3">Add Expense</Link>
            <Link to='/my-expenses' className="p-3">My Expenses</Link>
            <Link to='/login' className="p-3" onClick={logoutHandler}>Logout</Link>
        </div>
    )
}

export default Sidebar;