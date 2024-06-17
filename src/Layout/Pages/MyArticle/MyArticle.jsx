import { useContext } from "react";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useArticleReq from "../../../Hooks/useArticleReq"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyArticle = () => {
    const {user} = useContext(AuthFirebase);
    const [article, refetch] = useArticleReq();
    const axiosSecure = useAxiosSecure();


    const filter = article.filter(element => element.email === user?.email);

    const handleDelete = async(id) => {

       const deleteOne = await axiosSecure.delete(`/allNews/${id}`);
          console.log(deleteOne);

         const deleteArticleList = await axiosSecure.delete(`/articleReq/${id}`);
         console.log(deleteArticleList);
         if(deleteArticleList.data.deletedCount > 0){
            refetch();
            Swal.fire({
                icon:'success',
                title:'Article Deleted Successfully',
                showConfirmButton:false,
                timer:1500
            })
         }
    }

    return (
        <div>
        <div className="flex justify-evenly my-4">
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Article Title</th>
                        <th>Status</th>
                        <th>isPremium</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filter.map((article, index) => <tr key={article._id}>
                            <th>{index + 1}</th>
                            <td>{article.title}</td>
                            <td>{article.status}</td>
                            <td>{article.subscription == "premium" ? 'Yes' : 'No'}</td>
                            <td>
                               <Link to={`/details/${article._id}`}><button className="btn btn-accent  mr-2">Details</button></Link>
                                <button className="btn btn-primary mr-2">Update</button>
                                <button onClick={()=>handleDelete(article._id)} className="btn bg-red-600 text-white">Delete</button>
                            </td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyArticle;