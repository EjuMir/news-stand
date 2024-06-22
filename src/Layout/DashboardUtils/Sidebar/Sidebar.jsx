import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
   return (

      <div className="flex">
         <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
               <label htmlFor="my-drawer" className="btn bg-gray-300 border-2 drawer-button ml-2 mt-2 mr-3"><RxHamburgerMenu className="text-2xl"></RxHamburgerMenu></label>
               <NavLink to='/' ><button className="btn text-lg">&larr; Back To Home</button></NavLink>
               <Outlet></Outlet>
            </div>
            <div className="drawer-side">
               <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
               <ul className="menu p-4 w-fit min-h-full bg-base-200 text-base-content gap-4">
                  {/* Sidebar content here */}
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

               </ul>
            </div>
         </div>
      </div>
   );
};

export default Sidebar;