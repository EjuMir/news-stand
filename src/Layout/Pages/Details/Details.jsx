import { useParams } from "react-router-dom";
import useAllNews from "../../../Hooks/useAllNews";

const Details = () => {
    const [details] = useAllNews()
    const params = useParams();
    
    const newsDetail = details.find(detail => detail._id === params.id);
    console.log(newsDetail);

    return (
        <div>
            <div className="hero min-h-screen bg-red-400 my-10 py-6">
                <div className="hero-content text-center bg-white rounded-md">
                    <div className="max-w-md">
                        <img className="w-full h-72" src={newsDetail?.image} alt="" />
                        <h1 className="text-2xl font-bold mt-5">{newsDetail?.title}</h1>
                        <h2 className="italic text-lg my-3">By : {newsDetail?.publisher}</h2>
                        <p>{newsDetail?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;