import { useNavigate } from "react-router-dom";

const Plans = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/subscription');
    }

    return (
        <div>
            <div onClick={handleNavigate} className="flex flex-col border-2 lg:w-1/3 bg-black rounded-lg mx-auto my-14 hover:bg-gray-500 hover:cursor-pointer">
                <h2 className=" font-bold text-center text-4xl p-4 text-orange-500">Premium</h2>
                <hr />
                <div>
                    <h2 className="text-center font-bold text-xl my-7 text-green-500">Key Features :</h2>
                </div>
                <div className="flex flex-col gap-5 text-white p-2">
                    <p>&#x2705; You can access <span className="font-bold text-md text-cyan-500">All articles</span></p>
                    <p>&#x2705; You can post <span className="font-bold text-md text-cyan-500">Unlimited Articles</span></p>
                    <p>&#x2705; <span className="font-bold text-md text-cyan-500">Unlimited</span> Usage</p>
                    <p>&#x2705; Get Recognized By Renowned <span className="font-bold text-md text-cyan-500">Publishers</span></p>
                </div>
                <div>
                    <h2 className="text-center font-bold text-xl my-7 text-green-500">Package Validation :</h2>
                </div>
                <div className="flex flex-col gap-5 text-white p-2">
                    <p>&#x2705; 1 Minute For <span className="font-bold text-md text-cyan-500">1$</span></p>
                    <p>&#x2705; 5 Days For <span className="font-bold text-md text-cyan-500">10$</span></p>
                    <p>&#x2705; 10 Days For <span className="font-bold text-md text-cyan-500">15$</span></p>
                </div>
                <div>
                    <h2 className="text-white text-center my-4 font-bold text-xl">Click For Subscription</h2>
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default Plans;