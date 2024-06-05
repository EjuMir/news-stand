import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllNews = () => {
    const allNews = useAxiosPublic();

    const { data : news=[] } = useQuery({
        queryKey: ['allNews'],
        queryFn: async()=> {
            const res = await allNews.get('/allNews')
            return res.data;
        }
    })
    return [news]
};

export default useAllNews;