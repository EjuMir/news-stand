import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAllNews from "../../../Hooks/useAllNews";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const imageHostingKey = import.meta.env.VITE_imgbbApiKey;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`


const UpdateArticle = () => {

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const params = useParams();
    const [news] = useAllNews();
    const axiosSecure = useAxiosSecure();

    const details = news.find(newAr => newAr.id == params.id)
    console.log(details);

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        // console.log(imageFile);
        const res = await axiosPublic.post(imageHostingUrl, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        });
        if (res.data.success) {
            const articleInfo = {
                title: data.title,
                image: res.data.data.display_url,
                description: data.description,
                status: "UpdateRequest",
            }

            const articlePost = await axiosSecure.patch(`/articleReq/${details.id}`, articleInfo);
            console.log(articlePost);
            if (articlePost.data.updateReq.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Update Successful. Wait For Admin To Review`,
                    showConfirmButton: true,
                });

            }
        }
    }


    return (
        <div className="w-3/4 mx-auto my-16 bg-red-400 p-4 rounded-md">
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Article Title</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={details?.title}
                            placeholder="Write your article title here"
                            {...register('title', {
                                required : true,
                            })}
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Title Description</span>
                        </label>
                        <textarea
                            defaultValue={details?.description}
                            {...register('description', {
                                required : true,
                            })} className="textarea textarea-bordered h-24" placeholder="Write About Your Article"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Add An Eye-Catching Image :</span>
                        </label>
                        <input {...register('image', {
                            required : true,
                        })} type="file" className="file-input w-full max-w-xs bg-white" />
                    </div>
                    {

                    }
                    <button className="btn w-full bg-cyan-800 font-bold text-white border-none"> Update </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateArticle;