import useAllNews from "../../../Hooks/useAllNews";
import ArticleCard from "./ArticleCard";

const AllArticles = () => {

    const [allNewsArticle] = useAllNews();
    
    return (
        <div className="grid grid-cols-3 place-items-center gap-10">
            {
                allNewsArticle.map(article => <ArticleCard key={article._id} data={article}></ArticleCard>)
            }
        </div>
    );
};

export default AllArticles;