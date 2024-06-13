import { useContext } from "react";
import { AuthFirebase } from "../Authentication/Firebase";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdminPanel = () => {
    const { user, loading } = useContext(AuthFirebase);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isLoading]
};

export default useAdminPanel;