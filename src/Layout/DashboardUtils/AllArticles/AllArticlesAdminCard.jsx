import { useQuery } from "@tanstack/react-query";
import useAllUser from "../../../Hooks/useAllUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllArticlesAdminCard = ({ pending, refetch }) => {

    const axiosSecure = useAxiosSecure()
    const [author] = useAllUser(); 
    const { title, email, publisher, tags, date, status, _id, description, image } = pending;

    const findAuthor = author.filter(e => e.email == email);
    const authorImage = findAuthor.map(e => e.image);
    const authorName = findAuthor.map(e => e.name);


    const handleApprove = async(pending, _id) =>{
         const statusChange = await axiosSecure.patch(`/articleReq/${_id}`);
         console.log(statusChange.data.matchedCount);
         if(statusChange.data.matchedCount){
             refetch();
             Swal.fire({
                 position: "top-end",
                 icon: "success",
                 title: "Article Approved",
                 showConfirmButton: false,
                 timer: 1500,
             });
         }
         
         const postInfo = {
            title: pending.title,
            image: pending.image,
            publisher: pending.publisher,
            tags: pending.tags,
            description: pending.description,
            views : 0
         }

    }
    

    return (
        <div className="card w-80 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-lg font-bold">{title}</h2>
                <div className="flex gap-8">
                <div><img className="h-14 w-14 rounded-full" src={authorImage} alt="author picture" /></div>
                <div>
                <div><h2 className="font-bold">{authorName}</h2></div>
                <div><h2>{email}</h2></div>
                </div>
                </div>
                <div><h2>{date}</h2></div>
                <div><h2>Publisher : <span className="italic">{publisher}</span></h2></div>
                <div className="mb-2"><h2>{status}</h2></div>
                <div className="card-actions justify-center">
                    <button onClick={()=>handleApprove(pending, _id)} className="btn bg-green-400 text-cyan-700 font-bold">Approve</button>
                    <button className="btn bg-gray-300 text-red-600 font-bold">Decline</button>
                    <button className="btn bg-red-600 text-white font-bold">Delete</button>
                    <button className="btn bg-black text-orange-500 font-bold">Make Premium</button>
                </div>
            </div>
        </div>
    );
};

export default AllArticlesAdminCard;