
const TrendSlider = ({trending}) => {
    const {image, title} = trending;
    return (
        <div className="border-2 border-red-500 rounded-md hover:opacity-30">
            <h2 className="text-xl font-bold text-red-500">{title}</h2>
          <img className="h-96 w-full opacity-80" src={image} alt="" />
        </div>
    );
};

export default TrendSlider;