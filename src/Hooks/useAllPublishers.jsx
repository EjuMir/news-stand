import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPublishers = () => {
    const allPublisher = useAxiosPublic();

    const { data: publisher = [] } = useQuery({
        queryKey: ['allPublisher'],
        queryFn: async () => {
            const res = await allPublisher.get('/publisher');
            return res.data;
        }
    })
    return [publisher];
};

export default useAllPublishers;


