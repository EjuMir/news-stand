import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const ArticleCard = ({data}) => {
    
    const {title, image, publisher, description, views} = data;
    const [read, setRead] = useState(false);

    const handleRead = () => {
        setRead(!read);
    }

    return (
        <div className="border-2 border-red-500 my-12 p-4 rounded-xl hover:bg-red-500">
        <div className="card w-96 bg-base-100 shadow-xl image-full h-96">
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

                <div className="flex gap-3">
                   <p className="flex font-bold gap-2"><FaUser className="text-xl text-red-500"></FaUser> {publisher}</p>
                   <p className="flex font-bold gap-2"><IoEyeSharp className="text-2xl text-red-500"></IoEyeSharp>{views}</p>
                </div>
                <div className="card-actions justify-end mt-10">
                    <button className="btn bg-red-500 text-white font-bold hover:text-red-500">Read Details</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ArticleCard;