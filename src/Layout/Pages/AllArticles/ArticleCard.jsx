import { useContext, useState } from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAllUser from "../../../Hooks/useAllUser";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useAdminPanel from "../../../Hooks/useAdminPanel";

const ArticleCard = ({article}) => {
    
    const {title, image, publisher, description, views, _id, subscription} = article;
    const setView = parseInt(views);
    const [read, setRead] = useState(false);
    const axiosNews = useAxiosPublic(); 
    const [users] = useAllUser();
    const {user} = useContext(AuthFirebase);
    const [isAdmin] = useAdminPanel();
    
    const findUser = users.find(e => e.email == user?.email);

    const handleRead = () => {
        setRead(!read);
    }

    //view count increment
    const handleView = () => {
          axiosNews.patch(`/allNews/${_id}`, {
            views : parseInt(setView + 1)
          })
    }

    return (
        <div>
        { 
            subscription == "premium" ? <div className="border-2 border-red-500 my-3 p-4 bg-black rounded-xl hover:bg-red-400">
            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src={image} alt="article's picture" /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{title}</h2>
                    <div className="my-3">{
                        
                        read ? <div onClick={handleRead}>
                             <p>{description}</p>
                             <a className="text-white font-bold cursor-pointer">See less ...</a>
                        </div> 
                        :
                         <div>
                            <p>{description.slice(0,50) }</p>
                            <button onClick={handleRead} className="text-white font-bold cursor-pointer">Read more ...</button>
                        </div>
                    }</div>
    
                    <div>
                       <p className="flex font-bold gap-2 border-2 w-fit text-black p-2 rounded-md bg-gray-300 mb-2"><FaUser className="text-xl text-red-600"></FaUser> {publisher}</p>
                       <p className="flex font-bold gap-2 border-2 w-fit text-black p-2 rounded-md bg-gray-300"><IoEyeSharp className="text-2xl text-red-600"></IoEyeSharp><span>{setView}</span></p>
                    </div>
                    
                    <div className="card-actions justify-between mt-10">
                    <p className="flex text-lg bg-black text-orange-500 font-bold max-w-fit rounded-lg gap-2 p-2"><FaStar className="text-2xl"></FaStar>Premium</p>
                    {
                        findUser?.subscript == "premium" || isAdmin ? <Link to={`/details/${_id}`}><button onClick={handleView} className="btn bg-red-400 text-white font-bold hover:text-red-500">Read Details</button></Link> : <button disabled className="btn bg-red-400 text-white font-bold hover:text-red-500">Read Details</button>
                    }
                    </div>
                    
                    
                </div>
            </div>
            </div>
             
            :
            
            <div className="border-2 border-red-500 my-3 p-4 rounded-xl hover:bg-red-400">
            <div className="card bg-base-100 shadow-xl image-full">
                <figure><img src={image} alt="article's picture" /></figure>
                <div className="card-body">
                    <h2 className="card-title font-bold">{title}</h2>
                    <div className="my-3">{
                        
                        read ? <div onClick={handleRead}>
                             <p>{description}</p>
                             <a className="text-white font-bold cursor-pointer">See less ...</a>
                        </div> 
                        :
                         <div>
                            <p>{description.slice(0,50) }</p>
                            <a onClick={handleRead} className="text-white font-bold cursor-pointer">Read more ...</a>
                        </div>
                    }</div>
    
                    <div>
                       <p className="flex font-bold gap-2 border-2 w-fit text-black p-2 rounded-md bg-gray-300 mb-2"><FaUser className="text-xl text-red-600"></FaUser> {publisher}</p>
                       <p className="flex font-bold gap-2 border-2 w-fit text-black p-2 rounded-md bg-gray-300"><IoEyeSharp className="text-2xl text-red-600"></IoEyeSharp><span>{setView}</span></p>
                    </div>
                    <div className="card-actions justify-end mt-10">
                        
                       <Link to={`/details/${_id}`}><button onClick={handleView} className="btn bg-red-400 text-white font-bold hover:text-red-500">Read Details</button></Link>
                    </div>
                </div>
            </div>
            </div>
        }
        </div>
        
    );
};

export default ArticleCard;