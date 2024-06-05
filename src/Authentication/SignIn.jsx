import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthFirebase } from "./Firebase";




const SignIn = () => {

    const [password, showPassword] = useState(false);
    const { loginUser, googleUser } = useContext(AuthFirebase);
    const navigate = useNavigate();


    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        // console.log(email, password);

        loginUser(email, password)
            .then(() => {
                toast.success('You are logged in successfully');
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            })
            .catch(() => {
                toast.error('Please Put Correct Email/Password')
            })
    }

    const handleGoogleLogin = () => {
        googleUser()
            .then(() => {
                toast.success('You are logged in successfully');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            })


    }

    return (
        <div>
            <div className="hero min-h-screen my-10 bg-red-400">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div>
                        <h2 className="text-center mt-10 font-bold text-xl">Please Login !</h2>
                    </div>

                    <form onSubmit={handleLogin} className="card-body">
                        <div className="mx-auto mt-5 w-full">
                            <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                                <p className="text-red-500 font-bold">Login with Google</p>
                            </button>
                        </div>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
                        </div>
                        <div>
                            <ToastContainer></ToastContainer>

                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={password ? 'text' : 'password'} placeholder="Password" className="input input-bordered" required />
                            {
                                password || <FaEye onClick={() => { showPassword(true) }} className="absolute top-2/3 left-72"></FaEye>
                            }

                            {
                                password && <FaEyeSlash onClick={() => { showPassword(false) }} className="absolute top-2/3 left-72" />
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn hover:text-red-500 hover:bg-white hover:border-red-500 bg-red-400 text-white font-bold">Sign In</button>
                        </div>
                        <div>
                            <h1>Dont have an account? <NavLink to='/signUp' className='underline text-blue-600'>Register here</NavLink></h1>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default SignIn;