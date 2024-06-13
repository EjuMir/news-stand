import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthFirebase } from "../../../Authentication/Firebase";


const UserProfile = () => {

    const { user } = useContext(AuthFirebase);


    return (
        <div>
            <div className="hero min-h-screen border-2 border-red-600 w-fit mx-auto rounded-lg bg-opacity-40 mt-14">
                <div className="hero-content flex-col gap-5">
                    <div>
                        <img src={user?.photoURL} className="max-w-sm rounded-3xl shadow-2xl" />
                    </div>
                    <div>
                        <h1 className="text-xl text-red-900 font-bold">Name : <span className="ml-2 text-lg text-teal-900 font-bold">{user?.displayName}</span></h1>
                    </div>
                    <div>
                        <h1 className="text-xl text-red-900 font-bold">Email : <span className="ml-2 text-lg text-teal-900 font-bold">{user?.email}</span></h1>
                    </div>
                    <div>
                        <NavLink to='/updateProfile'><button className="btn text-red-500 bg-white border-2 border-black font-bold">Update Profile</button></NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;