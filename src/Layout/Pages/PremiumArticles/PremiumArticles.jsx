import useAllNews from "../../../Hooks/useAllNews";
import PremiumArticleCard from "./PremiumArticleCard";

const PremiumArticles = () => {
    const [allNews] = useAllNews();

    const onlyPremium = allNews.filter(elem => elem.subscription == "premium");
    
    return (
        <div>
            <div>
              <h2 className="text-3xl my-10 text-center font-bold">All Articles Are Here</h2>
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 place-items-center gap-10">
            
            {
                onlyPremium.map(elem => <PremiumArticleCard key={elem._id} elem={elem}></PremiumArticleCard>)
            }
        </div>
        </div>
    );
};

export default PremiumArticles;