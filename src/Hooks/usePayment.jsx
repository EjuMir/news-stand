import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
    const axios = useAxiosSecure();

    const {data: payment = [], refetch} = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axios.get('/payments');
            return res.data;
        }
    })
    return [payment, refetch];
};

export default usePayment;