import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const imageHostingKeyPublisher = import.meta.env.VITE_imgbbApiKeyForPublisher;
const imageHostingPath = `https://api.imgbb.com/1/upload?key=${imageHostingKeyPublisher}`

const AllPublishers = () => {

    const axiosSecured = useAxiosPublic();

    const handlePublisher = async (data) => {
        data.preventDefault();
        const form = new FormData(data.currentTarget);
        const name = form.get('name');
        const photoUrl = form.get('image');
        // console.log(name, photoUrl);

        const imageFile = { image: photoUrl}
    
        const res = await axiosSecured.post(imageHostingPath, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const publisherInfo = {
                name: name,
                logo_url: res.data.data.display_url
            }
            const articlePost = await axiosSecured.post('/publisher', publisherInfo);
            if (articlePost.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} is made a Publisher by You`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(()=>{
                    window.location.reload();
                  },1000)
            }
        }

    }


    return (
        <div className="my-20">
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
                            <h2 className="text-white font-bold mb-2">Publisher Logo:</h2>
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