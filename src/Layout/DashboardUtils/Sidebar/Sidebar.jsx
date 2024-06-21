import { NavLink, Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
    return (
        <div className="flex">
        <div className="w-64 min-h-screen bg-gray-200">
            <ul className="menu p-4 gap-6">
                        <li>
                           <NavLink to='/dashboard/AllArticles' data-tooltip-content={'AllArticles'} data-tooltip-id="AllArticles" className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} ><Tooltip id="AllArticles"></Tooltip>All Articles</NavLink>
                        </li>
                        <li>
                           <NavLink to='/dashboard/AllUsers' data-tooltip-content={'AllArticles'} data-tooltip-id="AllArticles" className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} ><Tooltip id="AllArticles"></Tooltip>All Users</NavLink>
                        </li>
                        <li>
                           <NavLink to='/dashboard/AddPublisher' data-tooltip-content={'AllArticles'} data-tooltip-id="AllArticles" className={({ isActive }) => isActive ? 'font-bold text-xl rounded-lg bg-black text-white' : 'text-white text-xl font-bold bg-red-400'} ><Tooltip id="AllArticles"></Tooltip>Add Publisher</NavLink>
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