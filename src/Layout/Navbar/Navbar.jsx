import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { IoHome } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { AiFillFileAdd } from "react-icons/ai";
import { AuthFirebase } from "../../Authentication/Firebase";
import { MdArticle, MdSubscriptions, MdWorkspacePremium } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import useAdminPanel from "../../Hooks/useAdminPanel";

const Navbar = () => {

    const { user, logOut } = useContext(AuthFirebase);
    const [mode, setMode] = useState('light');
    const [ isAdmin ] = useAdminPanel()

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
        <NavLink to='/allArticle' data-tooltip-content={'All Article'} data-tooltip-id="allArticle" className={({ isActive }) => isActive ? 'font-bold text-3xl rounded-lg px-4 p-2' : 'text-white font-bold text-[24px] px-4 py-2'} ><Tooltip id="allArticle"></Tooltip><ImBooks></ImBooks></NavLink>
{ user && <NavLink to='/subscription' data-tooltip-content={'Subscription'} data-tooltip-id="subscription" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="subscription"></Tooltip><MdSubscriptions></MdSubscriptions></NavLink>}
      
        {
            isAdmin && <NavLink to='/dashboard' data-tooltip-content={'Dashboard'} data-tooltip-id="dashboard" className={({ isActive }) => isActive? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="dashboard"></Tooltip><RxDashboard></RxDashboard></NavLink>
        }
{ user && <div data-tooltip-content={'Article'} data-tooltip-id="article" className="dropdown text-[22px] font-bold">
            <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-white font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <Tooltip id="article"></Tooltip>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-red-400 rounded-box w-20">
                <NavLink to='/addArticle' data-tooltip-content={'Add Article'} data-tooltip-id="addArticle" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="addArticle"></Tooltip><AiFillFileAdd></AiFillFileAdd></NavLink>
                <NavLink to='/myArticles' data-tooltip-content={'My Articles'} data-tooltip-id="myArticles" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="myArticles"></Tooltip><MdArticle></MdArticle></NavLink>
                {/* premium articles will be conditional */}
                <NavLink to='/premiumArticles' data-tooltip-content={'Premium Articles'} data-tooltip-id="premiumArticles" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="premiumArticles"></Tooltip><MdWorkspacePremium></MdWorkspacePremium></NavLink>
            </ul>
        </div>
 }
        <div className="lg:text-center lg:my-auto">
            <input onChange={handleChange} type="checkbox" className="toggle theme-controller bg-red-400 border-white [--tglbg:theme(colors.white)] checked:bg-red-300 checked:border-blue-800 checked:[--tglbg:theme(colors.black)] row-start-1 col-start-1 col-span-2" />
        </div>

    </>
    return (

        <div className="navbar bg-red-400">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-30 p-2 shadow bg-red-400 rounded-box w-20">
                        <NavLink to='/' data-tooltip-content={'Home'} data-tooltip-id="home" className={({ isActive }) => isActive ? 'font-bold text-3xl rounded-lg px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="home"></Tooltip><IoHome></IoHome></NavLink>
                        <NavLink to='/allArticle' data-tooltip-content={'All Article'} data-tooltip-id="allArticle" className={({ isActive }) => isActive ? 'font-bold text-3xl rounded-lg px-4 p-2' : 'text-white font-bold text-[24px] px-4 py-2'} ><Tooltip id="allArticle"></Tooltip><ImBooks></ImBooks></NavLink>

                        <NavLink to='/subscription' data-tooltip-content={'Subscription'} data-tooltip-id="subscription" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="subscription"></Tooltip><MdSubscriptions></MdSubscriptions></NavLink>
                        {/* dashboard will be conditional */}
                        <NavLink to='/dashboard' data-tooltip-content={'Dashboard'} data-tooltip-id="dashboard" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="dashboard"></Tooltip><RxDashboard></RxDashboard></NavLink>
                        <NavLink to='/addArticle' data-tooltip-content={'Add Article'} data-tooltip-id="addArticle" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="addArticle"></Tooltip><AiFillFileAdd></AiFillFileAdd></NavLink>
                        <NavLink to='/myArticles' data-tooltip-content={'My Articles'} data-tooltip-id="myArticles" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="myArticles"></Tooltip><MdArticle></MdArticle></NavLink>
                        {/* premium articles will be conditional */}
                        <NavLink to='/premiumArticles' data-tooltip-content={'Premium Articles'} data-tooltip-id="premiumArticles" className={({ isActive }) => isActive ? 'font-bold rounded-lg text-3xl px-4 p-2' : 'text-white font-bold text-[22px] px-4 py-2'} ><Tooltip id="premiumArticles"></Tooltip><MdWorkspacePremium></MdWorkspacePremium></NavLink>
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
                {
                    user ? <a onClick={() => logOut()} className="btn bg-red-400 text-white font-bold">Sign Out</a> : <div className="flex gap-2">
                        <NavLink to='/signUp' className={({isActive})=>isActive?'btn bg-black text-white font-bold border-none':'btn bg-white text-red-500 font-bold border-none'}>Sign Up</NavLink>
                        <NavLink to='/signIn' className={({isActive})=>isActive?'btn bg-black text-white font-bold border-none':'btn bg-white text-red-500 font-bold border-none'}>Sign In</NavLink>
                        </div>

                }

                {
                    user && <NavLink to='/userProfile'><div className="w-8 h-8" data-tooltip-content={user && user.displayName} data-tooltip-id="profile">
                        <Tooltip id="profile"></Tooltip>
                        <img className="w-8 h-8 rounded-2xl" src={user ? user?.photoURL : <CgProfile className="w-8 h-8"></CgProfile>} />
                    </div></NavLink>
                }
            </div>
        </div>
    );
};

export default Navbar;