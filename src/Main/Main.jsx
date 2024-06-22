import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import useAllUser from "../Hooks/useAllUser";
import { useContext, useEffect, useState } from "react";
import { AuthFirebase } from "../Authentication/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAdminPanel from "../Hooks/useAdminPanel";


const Main = () => {

    const [isAdmin] = useAdminPanel()
    const [allUsers, refetch] = useAllUser();
    const { user } = useContext(AuthFirebase);
    const axiosPublic = useAxiosPublic();
    const [subscriptionMessage, setSubscriptionMessage] = useState('Subscribed')

    const filter = allUsers.filter(elem => elem.email == user?.email);

    const [userSub] = filter.map(elem => elem.premiumExpiresIn);

    const currentTime = new Date().getTime();

    useEffect(() => {
        if(!isAdmin){
            if (currentTime > userSub) {
                const res = axiosPublic.patch(`/users/${user.email}`, {
                    subscript: 'normal',
                })
                // console.log(res);
                refetch();
                setSubscriptionMessage('Not Subscribed');
            }
            else(
                setSubscriptionMessage('Subscribed')
            )
        }
        else{
            setSubscriptionMessage('Admin')
        }
       
    }, [refetch, axiosPublic, user, currentTime, userSub, isAdmin]);

    return (
        <div>
            <Navbar value={subscriptionMessage}></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;