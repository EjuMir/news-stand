import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex">
        <div className="w-64 min-h-screen bg-gray-200">
            <ul className="menu p-4 gap-6">
                        <li>
                           <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} >Dashboard Home</NavLink>
                        </li>
                        <li>
                           <NavLink to='/dashboard/AllArticles' className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} >All Articles</NavLink>
                        </li>
                        <li>
                           <NavLink to='/dashboard/AllUsers' className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} >All Users</NavLink>
                        </li>
                        <li>
                           <NavLink to='/dashboard/AddPublisher' className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} >Add Publisher</NavLink>
                        </li>
                        <li>
                           <NavLink to='/' className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} >&larr; Back To Home</NavLink>
                        </li>

            </ul>
        </div>
        <div className="flex-1 p-8">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default Sidebar;