import { Link } from "react-router-dom";

const TrendSlider = ({trending}) => {
    const {image, title, _id} = trending;
    return (
        <Link to={`/details/${_id}`}>
        <div className="border-2 border-red-500 rounded-md hover:opacity-30">
            <h2 className="text-xl font-bold text-red-500">{title}</h2>
          <img className="h-96 w-full opacity-80" src={image} alt="" />
        </div>
        </Link>
    );
};

export default TrendSlider;