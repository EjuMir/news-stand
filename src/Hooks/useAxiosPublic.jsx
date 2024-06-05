import axios from "axios";

const base = axios.create({
    baseURL: 'http://localhost:5000'
  });

  const useAxiosPublic = () => {
    return base
  };
  
export default useAxiosPublic;
