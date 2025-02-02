import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { updateProfile } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthFirebase } from "./Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";



const SignUp = () => {
    const { createUser } = useContext(AuthFirebase);
    const [pass, showPass] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const newUser = useAxiosPublic()

    const handleSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoUrl = form.get('text');
        const email = form.get('email');
        const password = form.get('password');

        setError('');

        if (name == '' || photoUrl == '' || email == '' || password == '') {
            toast.error('Please fulfill all the requirements');
            return
        }

        else if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }


        else if (!/[A-Z]/.test(password)) {
            setError('Must have an UpperCase character');
            return;
        }
        else if (!/[0-9]/.test(password)) {
            setError('Must have a Numeric character');
            return;
        }
        else if (!/[a-z]/.test(password)) {
            setError('Must have a LowerCase character');
            return;
        }
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError('Must have an special character');
            return;
        }


        createUser(email, password)
            .then(result => {
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoUrl
                })
                    .then(() => {
                        const userInfo = {
                            name: result.user.displayName,
                            email: result.user.email,
                            image: result.user.photoURL,
                            createdAccount: result.user.metadata.creationTime,
                            lastLogin: result.user.metadata.lastSignInTime,
                            subscript: 'normal', 
                        }
                        newUser.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Account created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                setTimeout(() => {
                    window.location.reload();
                }, 1600);
            })
            .catch(() => {
                toast.error('Email already in use');
            })


    }
    return (
        <div>
            <div className="animate__animated animate__fadeInLeft hero min-h-screen bg-red-400 my-10">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                    <div>
                        <h2 className="text-center mt-5 font-bold text-xl">Please Sign Up Here !</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="name" placeholder="Your Name" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input name="text" type="text" placeholder="Your Photo" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Your Email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={pass ? 'text' : 'password'} placeholder="Create Password" className="input input-bordered" required/>
                            {
                                pass || <FaEye onClick={() => { showPass(true) }} className="absolute top-2/3 left-full -translate-x-8"></FaEye>
                            }

                            {
                                pass && <FaEyeSlash onClick={() => { showPass(false) }} className="absolute top-2/3 left-full -translate-x-8" />
                            }
                        </div>
                        <div>
                            {
                                error && <p className="text-red-600">{error}</p>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn hover:text-red-500 hover:bg-white hover:border-red-500 bg-red-400 text-white font-bold">Sign Up</button>
                        </div>
                        <ToastContainer></ToastContainer>
                        <div>
                            <h1>Already have an account? <NavLink to='/signIn' className='underline text-blue-600'>Login here</NavLink></h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;