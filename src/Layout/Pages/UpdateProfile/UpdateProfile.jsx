import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UpdateProfile = () => {

    const {user} = useContext(AuthFirebase);
    const axiosPublic = useAxiosPublic();
    
    const handleUpdate = (e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget);
        let modifiedName = form.get('name'); 
        let modifiedPhoto = form.get('photoUrl');


        if(modifiedName == ''){
            modifiedName = user.displayName;
         }
        if(user){
            updateProfile(user, {
                displayName: modifiedName
            })
        }
        if(modifiedPhoto == ''){
           modifiedPhoto = user.photoURL;
        }
        if(user){
            updateProfile(user, {
                photoURL: modifiedPhoto  
            })
        }

        axiosPublic.patch(`users/${user?.email}`, {
            updatedPhoto : modifiedPhoto,
            updatedName : modifiedName
        })
    
        setTimeout(()=>{
            toast.success('Your Profile Has Been Updated')
        },200)
        setTimeout(() => {
            window.location.reload();
        }, 1200);
        
    }
  
    return (
        <div>
            <ToastContainer></ToastContainer>
            <div data-aos='fade-left' className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleUpdate} className="card-body bg-red-300 bg-opacity-30 rounded-md">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Modify Name : </span>
                                </label>
                                <input type="text" name='name' placeholder="Your New Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Your Profile Picture :</span>
                                </label>
                                <input type="text" name='photoUrl' placeholder="Your New Profile Picture" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-white text-red-500">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;