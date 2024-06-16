import useArticleReq from "../../../Hooks/useArticleReq";
import AllArticlesAdminCard from "./AllArticlesAdminCard";

const AllArticlesAdmin = () => {
    const [pendingReq, refetch] = useArticleReq();
    
    return (
        <div className="grid grid-cols-2 gap-3 place-items-center">
            
            {
                pendingReq.map(pending => <AllArticlesAdminCard key={pending._id} refetch={refetch} pending={pending}></AllArticlesAdminCard>)
            }
        </div>
    );
};

export default AllArticlesAdmin;