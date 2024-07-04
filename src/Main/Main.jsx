import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import useAllUser from "../Hooks/useAllUser";
import { useContext, useEffect, useState } from "react";
import { AuthFirebase } from "../Authentication/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const Main = () => {

    const [allUsers, refetch] = useAllUser();
    const { user } = useContext(AuthFirebase);
    const axiosPublic = useAxiosPublic();
    const [subscriptionMessage, setSubscriptionMessage] = useState('Unsubscribed');

    const filter = allUsers.filter(elem => elem.email == user?.email);
    const [userSub] = filter.map(elem => elem.premiumExpiresIn);

    const currentTime = new Date().getTime();

    useEffect(() => {
        if(currentTime < userSub){
           setSubscriptionMessage('Subscribed')
        }        
        if (currentTime > userSub) {
            const res = axiosPublic.patch(`/users/${user.email}`, {
                subscript: 'normal',
            })
            setSubscriptionMessage('Unsubscribed');
            refetch();
            Swal.fire({
                title: 'Your Subscription Has Expired',
                icon: 'error',
                showConfirmButton: false,
                timer: 1500,
            })

        }
    }, [refetch, axiosPublic, user, currentTime, userSub]);

    return (
        <div>
            <Navbar value={subscriptionMessage}></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;