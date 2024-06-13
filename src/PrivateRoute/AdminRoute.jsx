import { useContext } from "react";
import useAdminPanel from "../Hooks/useAdminPanel";
import { AuthFirebase } from "../Authentication/Firebase";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {

    const { user, loading } = useContext(AuthFirebase);
    const [isAdmin, isAdminLoading] = useAdminPanel();

    if (loading || isAdminLoading) {
        return <span className="loading loading-ring loading-lg"></span>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/signIn"></Navigate>
};

export default AdminRoute;