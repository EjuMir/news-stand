import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Select from 'react-select';
import { useContext, useState } from "react";
import { AuthFirebase } from "../../../Authentication/Firebase";
import useAllNews from "../../../Hooks/useAllNews";
import { useNavigate } from "react-router-dom";
import useAllPublishers from "../../../Hooks/useAllPublishers";

//imgbb keys
const imageHostingKey = import.meta.env.VITE_imgbbApiKey;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const getDate = () => {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

const AddArticle = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(getDate());

    const [allNews] = useAllNews();
    const [allPublisher] = useAllPublishers();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthFirebase);
    const { control, register, handleSubmit, reset } = useForm();

    if (getDate() !== currentDate) {
        return setCurrentDate(getDate())
    }

    const tagOption = [
        { value: 'AI', label: 'AI' },
        { value: 'healthcare', label: 'healthcare' },
        { value: 'technology', label: 'technology' },
        { value: 'peace', label: 'peace' },
        { value: 'diplomacy', label: 'diplomacy' },
        { value: 'nature', label: 'nature' },
        { value: 'ocean', label: 'ocean' },
        { value: 'science', label: 'science' },
    ];

    // const publisherOption = [
    //     { value: 'Finance Today', label: 'Finance Today' },
    //     { value: 'Tech Daily', label: 'Tech Daily' },
    //     { value: 'Health News', label: 'Health News' },
    //     { value: 'Global News', label: 'Global News' },
    //     { value: 'Auto Trends', label: 'Auto Trends' },
    //     { value: 'Nature World', label: 'Nature World' },
    // ]
    
 let allOption = [];
 for(let i = 0; i < allPublisher.length; i++) {
    allOption[i] = { value: allPublisher[i].name, label: allPublisher[i].name }
    allOption.push(allOption[i])
 }

    const onSubmit = async (data) => {
        
        // const existingUser = allNews.find(news => news.email == user?.email);
        // if (existingUser.subscription == "normal") {
        //      return navigate('/subscription') 
        // }

        const imageFile = { image: data.image[0] }
        console.log(imageFile);
        const res = await axiosPublic.post(imageHostingUrl, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        });
        
        if (res.data.success) {
            const articleInfo = {
                email: user.email,
                title: data.title,
                image: res.data.data.display_url,
                publisher: data.publisher,
                description: data.description,
                tags: data.tag,
                date: currentDate, 
                status: "Pending",
                subscription: "normal",
            }
           
            const articlePost = await axiosSecure.post('/articleReq', articleInfo);
            
            if (articlePost.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: `Your post '${data.title}' is waiting for Approval`,
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        }
    };

    return (
        <div className="w-3/4 mx-auto my-16 bg-red-400 p-4 rounded-md">
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                    <label className="label text-end">
                            <span className="label-text text-white font-bold text-lg text-end">Date</span>
                    </label>
                      <h1 className="font-bold " {...register('date', {value : {currentDate}})}>{currentDate}</h1>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Article Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Write your article title here"
                            {...register('title', { required: {
                                value : true,
                                message: "Please enter a title",
                            } })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Title Description</span>
                        </label>
                        <textarea {...register('description', {required : {
                            value: true,
                            message : "Please enter description"
                        }})} className="textarea textarea-bordered h-24" placeholder="Write About Your Article"></textarea>
                    </div>
                    <div className="flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-white font-bold text-lg">Tag</span>
                            </label>
                            <Controller
                                control={control}
                                defaultValue={tagOption.map(c => c.value[0])}
                                name="tag"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        value={tagOption.filter(c => value.includes(c.value))}
                                        onChange={val => onChange(val.map(c => c.value))}
                                        options={tagOption}
                                        isMulti
                                    />
                                )}
                            />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-white font-bold text-lg">Publisher</span>
                            </label>
                            <Controller
                                control={control}
                                defaultValue={allPublisher.map(c => c.name[0])}
                                name="publisher"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        value={allOption.filter(c => value.includes(c.value))}
                                        onChange={val => onChange(val.value)}
                                        options={allOption}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Add An Eye-Catching Image :</span>
                        </label>
                        <input {...register('image', { required: {
                            value: true,
                            message: "Please upload an image"
                        } })} type="file" className="file-input w-full max-w-xs bg-white" />
                    </div>
                    <div className="form-control mb-6">
                    <label className="label text-end">
                            <span className="label-text text-white font-bold text-lg text-end">Your Email :</span>
                    </label>
                      <h1 className="font-bold " {...register('email', {value : {user}})}>{user.email}</h1>
                    </div>
                    {

                    }
                    <button className="btn w-full"> Publish </button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;