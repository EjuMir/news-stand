import useAllNews from "../../../Hooks/useAllNews";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {

    const [allNewsArticle] = useAllNews();
    
    return (
        <div>
            <div>
              <h2 className="text-3xl my-10 text-center font-bold">All Articles Are Here</h2>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-6">
            
            {
                allNewsArticle.map(article => <ArticleCard key={article._id} article={article}></ArticleCard>)
            }
        </div>
        </div>
    );
};

export default AllArticles;