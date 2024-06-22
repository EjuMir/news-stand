import useAllUser from "../../../Hooks/useAllUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Modal from 'react-modal';
import { useState } from "react";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const AllArticlesAdminCard = ({ pending, refetch }) => {

    const axiosSecure = useAxiosSecure();
    const [author] = useAllUser();
    const { title, email, publisher, tags, date, status, _id, description, image } = pending;

    const findAuthor = author.filter(e => e.email == email);
    const authorImage = findAuthor.map(e => e.image);
    const authorName = findAuthor.map(e => e.name);

    //Approve Post
    const handleApprove = async (pending, _id) => {
        const statusChange = await axiosSecure.patch(`/articleReq/${_id}`, {
            status: 'Approved'
        });
        console.log(statusChange);
        if (statusChange.data.result.matchedCount > 0) {
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
            id: pending._id,
            title: pending.title,
            image: pending.image,
            publisher: pending.publisher,
            tags: pending.tags,
            description: pending.description,
            views: 0,
            subscription: "normal",
            email: pending.email,
        }

        const articlePost = await axiosSecure.post('/allNews', postInfo)
        // console.log(articlePost);

    }

    //Delete Post
    const handleDelete = async (id) => {
        const deleteOne = await axiosSecure.delete(`/allNews/${id}`);
        // console.log(deleteOne);
        const deleteArticleList = await axiosSecure.delete(`/articleReq/${id}`);
        if (deleteArticleList.data.deletedCount > 0) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Article Deleted Successfully',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    //Decline Post
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleDecline = async (e) => {
        e.preventDefault();
        const form = e.target.reason.value;
        const decline = await axiosSecure.patch(`/articleReq/${_id}`, {
            declineReason: form,
            status: "Declined"
        })
        if (decline.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Declination Reason Has Been Submitted Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            closeModal();
        }
        // console.log(decline);
    }

    //make premium post
    const handleMakePremium = async (id) => {
        const subscript = await axiosSecure.patch(`/articleReq/${id}`, {
            subscription: "premium",
            status: 'Approved',
        })

        const makePremium = await axiosSecure.patch(`/allNews/${id}`, {
            subscription: "premium",
            status: 'Approved',
        })
        // console.log(makePremium);
        if (makePremium.data.updateSubscription.matchedCount > 0) {
            refetch();
            Swal.fire({
                icon: 'success',
                title: 'Article Is Added As Premium',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    //approve update
    const handleApproveUpdate = async(id) => {

        const updateArticle = {
            title: pending.title,
            image: pending.image,
            description: pending.description,
            status: "Approved",
        }

        const updateDoc = await axiosSecure.patch(`/allNews/${id}`, updateArticle)
        if(updateDoc.data.updateInfo.matchedCount > 0) {
            axiosSecure.patch(`/articleReq/${id}`, {
                 status: "Approved",
            })
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Article Updated Successfully",
                showConfirmButton: false,
                timer: 1500,
            })
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
                {
                    status == "Pending" ? <div className="card-actions justify-center">
                        <button onClick={() => handleApprove(pending, _id)} className="btn bg-green-400 text-cyan-700 font-bold">Approve</button>
                        <div>
                            <button className="btn bg-gray-300 text-red-600 font-bold" onClick={openModal}>Decline</button>
                            <Modal
                                ariaHideApp={false}
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h2 className="mb-2">Reason</h2>
                                <form onSubmit={handleDecline}>
                                    <div>
                                        <textarea className="border border-black" name="reason" id="reason"></textarea>
                                    </div>
                                    <div className="mt-2"><input className="btn bg-green-700 text-white" type="submit" value="Submit" /></div>
                                </form>
                                <button className="btn btn-error mt-2 mr-2 font-bold text-xl text-white hover:bg-gray-400" onClick={closeModal}>X</button>

                            </Modal>
                        </div>
                        <button onClick={() => handleDelete(_id)} className="btn bg-red-600 text-white font-bold">Delete</button>
                    </div> :
                        <div>
                            <button onClick={() => handleDelete(_id)} className="btn bg-red-600 text-white font-bold mr-2">Delete</button>
                            <button onClick={() => handleMakePremium(_id)} className="btn bg-black text-orange-500 font-bold">Make Premium</button>
                            {
                                status == 'UpdateRequest' &&  <button onClick={() => handleApproveUpdate(_id)} className="btn bg-green-400 text-cyan-700 font-bold mt-1">Approve Update</button>
                            }
                        </div>
                }

            </div>
        </div>
    );
};

export default AllArticlesAdminCard;