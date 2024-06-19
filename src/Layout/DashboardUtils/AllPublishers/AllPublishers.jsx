import useAxiosSecured from "../../../Hooks/useAxiosSecure";

const imageHostingKeyPublisher = import.meta.env.VITE_imgbbApiKey;
const imageHostingPath = `https://api.imgbb.com/1/upload?key=${imageHostingKeyPublisher}`

const AllPublishers = () => {

    const axiosSecured = useAxiosSecured();

    const handlePublisher = async(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photoUrl = form.get('image');
        console.log(name, photoUrl);

        const imageFile = { image: data.image[0] }
        const res = await axiosSecured.post(imageHostingPath, imageFile, {
        headers: {
            'content-type': 'multipart/form-data'
        }
        });

        if(res.data.success){
            const publisherInfo = {
                name,
                photoUrl: res.data.data.display_url
            }
            axiosSecured.post('/publisher', publisherInfo)
               .then(res => {
                    console.log(res.data);
                })
               .catch(err => {
                    console.log(err);
                })
            e.currentTarget.reset();
        }

    }


    return (
        <div>
            <form onSubmit={handlePublisher}>
                <div className="bg-black p-10 text-center w-2/3 rounded-lg mx-auto">
                    <h2 className="font-bold text-2xl text-red-300 p-2 bg-black">Add Your Publisher</h2>
                    <div className="my-4">
                        <label>
                            <h2 className="text-white font-bold mb-2">Publisher Name:</h2>
                        </label>
                        <input type="text" name="name" placeholder="Type here" className="input input-bordered border-2 border-red-600 input-secondary w-full max-w-xs" />
                    </div>
                    <div>
                        <label>
                            <h2 className="text-white font-bold mb-2">Publisher Image:</h2>
                        </label>
                        <input type="file" name="image" className="file-input file-input-bordered border-red-600 border-2 file-input-secondary w-full max-w-xs" />
                    </div>
                    <div className="mt-6">
                        <input type="submit" className="btn btn-secondary w-fit" value="Submit" />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AllPublishers;