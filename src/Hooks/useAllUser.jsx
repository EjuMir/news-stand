
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import usePayment from './usePayment';
import { useContext } from 'react';
import { AuthFirebase } from '../Authentication/Firebase';

const useAllUser = () => {
    const allUser = useAxiosPublic();
    const [subscriptionUser] = usePayment();
    const {user} = useContext(AuthFirebase);

    const filter = subscriptionUser.filter(sub => sub.email == user?.email);
    console.log(filter);

    // let currentTime = new Date().getTime();
    // if(currentTime > subscriptionUser.expiredDate){

    // }
    
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