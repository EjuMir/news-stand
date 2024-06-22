import axios from "axios";
import { AuthFirebase } from "../Authentication/Firebase";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'https://news-stand-server.vercel.app'
})

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthFirebase);
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('token')
        config.headers.authorization = token;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/signIn')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;