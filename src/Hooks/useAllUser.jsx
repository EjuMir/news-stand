
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllUser = () => {
    const allUser = useAxiosPublic();
    const { data : users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await allUser.get('/users');
            return res.data;
        }
    })
    return [users];
};

export default useAllUser;