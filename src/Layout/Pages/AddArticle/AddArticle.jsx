import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from 'react';
import Select from 'react-select';
import { Input } from "postcss";

//imgbb keys
const imageHostingKey = import.meta.env.VITE_imgbbApiKey;
const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const AddArticle = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { control, register, handleSubmit, reset } = useForm();

    const tagOption = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const publisherOption = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]


    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(imageHostingUrl, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const articleInfo = {
                title: data.title,
                image: res.data.data.display_url,
                publisher: data.publisher,
                tags: data.tag
            }
            console.log(articleInfo);
            // const articlePost = await axiosSecure.post('/articleReq', articleInfo);
            // console.log(articlePost.data)
            // if (articlePost.data.insertedId) {
            //     reset();
            //     Swal.fire({
            //         position: "top-end",
            //         icon: "success",
            //         title: `Your post ${data.name} is waiting for Approval`,
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            // }
        }
    };

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
                            placeholder="Write your article title here"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
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
                                defaultValue={publisherOption.map(c => c.value[0])}
                                name="publisher"
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        inputRef={ref}
                                        value={publisherOption.filter(c => value.includes(c.value))}
                                        onChange={val => onChange(val.value)}
                                        options={publisherOption}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Title Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Write About Your Article"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text text-white font-bold text-lg">Add An Eye-Catching Image :</span>
                        </label>
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs bg-white" />
                    </div>
                    <button className="btn w-full"> Publish </button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;