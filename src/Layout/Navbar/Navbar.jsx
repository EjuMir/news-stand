import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { IoHome } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { AiFillFileAdd } from "react-icons/ai";
import { FaHandHoldingMedical } from "react-icons/fa";
import { AuthFirebase } from "../../Authentication/Firebase";

const Navbar = () => {

    const { user, logOut } = useContext(AuthFirebase);
    const [mode, setMode] = useState('light');

    const handleChange = e => {
        if (e.target.checked) {
            setMode('dark');
        }
        else {
            setMode('light');
        }
    }

    useEffect(() => {
        localStorage.setItem('mode', mode);
        const themeMode = localStorage.getItem('mode');
        document.querySelector('html').setAttribute('data-theme', themeMode)
    }, [mode]);



    const navLink = <>
        <NavLink to='/' data-tooltip-content={'Home'} data-tooltip-id="home" className={({ isActive }) => isActive ? 'font-bold text-3xl rounded-lg px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="home"></Tooltip><IoHome></IoHome></NavLink>
        <NavLink to='/allBooks' data-tooltip-content={'All Books'} data-tooltip-id="allBooks" className={({ isActive }) => isActive ? 'font-bold text-3xl rounded-lg px-4 p-2' : 'text-white font-bold text-[24px] px-4 py-2'} ><Tooltip id="allBooks"></Tooltip><ImBooks></ImBooks></NavLink>
        <NavLink to='/addBooks' data-tooltip-content={'Add Book'} data-tooltip-id="addBooks" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="addBooks"></Tooltip><AiFillFileAdd></AiFillFileAdd></NavLink>
        <NavLink to='/borrowedBooks' data-tooltip-content={'Borrow Books'} data-tooltip-id="borrowBooks" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="borrowBooks"></Tooltip><FaHandHoldingMedical></FaHandHoldingMedical></NavLink>
        <div className="lg:text-center lg:my-auto">
            <input onChange={handleChange} type="checkbox" className="toggle theme-controller bg-red-400 border-white [--tglbg:theme(colors.white)] checked:bg-red-300 checked:border-blue-800 checked:[--tglbg:theme(colors.black)] row-start-1 col-start-1 col-span-2" />
        </div>
    </>
    return (

        <div className="navbar bg-red-500">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-red-500 rounded-box w-20">
                        {navLink}
                    </ul>
                </div>
                <NavLink to='/'>
                    <div>
                        <img className="w-12 h-12 lg:w-20 lg:h-16" src="https://images.vexels.com/media/users/3/131563/isolated/preview/93e49b6c5668d156aaee447bd9804fab-newspaper-circle-icon.png" alt="" />
                    </div>
                </NavLink>
            </div>
            <div className="navbar-center border-cyan-800 border-opacity-20 rounded-md hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-10">
                    {navLink}
                </ul>
            </div>

            <div className="navbar-end gap-2">

                <NavLink to='/signUp'><a className="btn bg-cyan-600 text-white font-bold">Sign Up</a></NavLink>

                {
                    user ? <a onClick={() => logOut()} className="btn bg-red-500 text-white font-bold">Sign Out</a> : <NavLink to='/signIn'><a className="btn bg-cyan-800 text-white font-bold">Sign In</a></NavLink>

                }

                {
                   user && <div className="w-8 h-8" data-tooltip-content={user && user.displayName} data-tooltip-id="profile">
                   <Tooltip id="profile"></Tooltip>
                   <img className="w-8 h-8 rounded-2xl" src={user? user?.photoURL:<CgProfile className="w-8 h-8"></CgProfile>} />
                   </div>
                }
            </div>
        </div>
    );
};

export default Navbar;