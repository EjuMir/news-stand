import { useParams } from "react-router-dom";
import useAllNews from "../../../Hooks/useAllNews";
import useArticleReq from "../../../Hooks/useArticleReq";

const Details = () => {
    const [details] = useAllNews();
    const [myArticleDetail] = useArticleReq();
    const params = useParams();
    
    const newsDetail = details.find(detail => detail._id === params.id);
    console.log(newsDetail);
    const myArticle = myArticleDetail.find(detail => detail._id === params.id);
    console.log(myArticle);

    return (
        <div>
            <div className="hero min-h-screen bg-red-400 my-10 py-6">
                <div className="hero-content text-center bg-white rounded-md">
                    <div className="max-w-md">
                        <img className="w-full h-72" src={newsDetail?.image || myArticle?.image} alt="" />
                        <h1 className="text-2xl font-bold mt-5">{newsDetail?.title || myArticle?.title}</h1>
                        <h2 className="italic text-lg my-3">By : {newsDetail?.publisher || myArticle?.publisher}</h2>
                        <p>{newsDetail?.description || myArticle?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;