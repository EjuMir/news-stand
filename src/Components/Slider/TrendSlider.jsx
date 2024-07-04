import { Link } from "react-router-dom";

const TrendSlider = ({trending}) => {
    const {image, title, _id} = trending;
    return (
        <Link to={`/details/${_id}`}>
        <div className="border-2 border-red-500 rounded-md hover:opacity-30">
            <h2 className="text-xl font-bold text-black p-2 text-center ">{title}</h2>
          <img className="h-96 w-full" src={image} alt="" />
        </div>
        </Link>
    );
};

export default TrendSlider;