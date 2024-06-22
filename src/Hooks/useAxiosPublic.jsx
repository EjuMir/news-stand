import axios from "axios";

const base = axios.create({
    baseURL: 'https://news-stand-server.vercel.app'
  });

  const useAxiosPublic = () => {
    return base
  };
  
export default useAxiosPublic;
