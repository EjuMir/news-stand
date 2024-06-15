import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useArticleReq = () => {
    const articleRequest = useAxiosSecure();
    
    const { data: article = [], refetch } = useQuery({
        queryKey: ['articleRequest'],
        queryFn: async () => {
            const res = await articleRequest.get('/articleReq');
            return res.data;
        },
        
    })
    return [article, refetch];
};

export default useArticleReq;