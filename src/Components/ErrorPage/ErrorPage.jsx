import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate();

    const handleBack = () =>{
        navigate(-1);
    }
    return (
        <div className="my-10">
            <div className="mx-auto content-center"><img className="mx-auto" src="https://elementor.com/blog/wp-content/uploads/2021/03/Redesign-Your-Website_8.png" alt="" /></div>
            <div className="mx-auto text-center my-10">
            <button onClick={handleBack} className="btn btn-primary bg-gray-300 font-bold text-black">Go Back</button>
            </div>
        </div>
    );
};

export default ErrorPage;