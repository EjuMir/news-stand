import { useContext } from "react";
import { AuthFirebase } from "../Authentication/Firebase";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthFirebase);

    if(loading){
        return <div className="mx-auto text-center mt-10"><p className="loading loading-bars loading-lg"></p></div>
    }

    if(user){
        return children;
    }

   else{
    return <Navigate to='/signIn'></Navigate>
   }
};

export default PrivateRoute;