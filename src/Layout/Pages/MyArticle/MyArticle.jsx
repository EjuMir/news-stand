import { useContext, useState } from "react";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useArticleReq from "../../../Hooks/useArticleReq"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Modal from 'react-modal';

//styles for modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor : 'pink'
    },
};


const MyArticle = () => {
    const { user } = useContext(AuthFirebase);
    const [article, refetch] = useArticleReq();
    const axiosSecure = useAxiosSecure();


    const filter = article.filter(element => element.email === user?.email);

    const handleDelete = async (id) => {

        const deleteOne = await axiosSecure.delete(`/allNews/${id}`);
        // console.log(deleteOne);

        const deleteArticleList = await axiosSecure.delete(`/articleReq/${id}`);
        // console.log(deleteArticleList);
        if (deleteArticleList.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Article Deleted Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    //modal showing reason

    const [showModal, setShowModal] = useState(undefined);
    const handleClose = () => setShowModal(undefined);
    const handleShow = (id) => setShowModal(id);


    return (
        <div>
            <div onClick={handleClose} className="flex justify-evenly my-4">
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
                                <td>{article.status == "Declined" ?
                                    <div className="flex gap-1 justify-items-center">
                                        <div>{article.status}</div>
                                        <div onClick={() => handleShow(article._id)} className="p-1 bg-white border-2 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer"><h2>Reason</h2></div>
                                        <div>
                                            <Modal
                                                style={customStyles}
                                                isOpen={showModal == article._id}
                                                onRequestClose={handleClose}
                                                contentLabel="Example Modal"
                                                ariaHideApp={false}
                                            >
                                                <div className="text-center">
                                                    <h2 className="mb-2 text-red-700 font-bold">Reason For Declining : </h2>
                                                    <div className="border-2 border-red-600 p-2 rounded-md">
                                                        <h2>{article.declineReason}</h2>
                                                    </div>
                                                    <button className="btn btn-error mt-2 mr-2 font-bold text-xl text-white hover:bg-gray-400" onClick={handleClose}>X</button>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                    : <div>{article.status}</div>}
                                </td>
                                <td>{article.subscription == "premium" ? 'Yes' : 'No'}</td>
                                <td>
                                    <Link to={`/details/${article._id}`}><button className="btn btn-accent text-white mr-2">Details</button></Link>
                                    {
                                       article.status == "Declined" ?  '' :  <button onClick={() => handleDelete(article._id)} className="btn bg-red-600 text-white mr-2">Delete</button>
                                    }
                                    {
                                       article.status == "Pending" ? '' :  <button className="btn btn-primary mr-2">Update</button>
                                    }
                                  
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