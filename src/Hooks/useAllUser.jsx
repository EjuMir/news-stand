
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllUser = () => {
    const allUser = useAxiosPublic();
    
    const { data : users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await allUser.get('/users');
            return res.data;
        }
    })
    return [users, refetch];
};

export default useAllUser;