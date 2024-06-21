import Publisher from '../../../Components/Publisher/Publisher';
import Slider from '../../../Components/Slider/Slider'
import Statistics from '../../../Components/Statistics/Statistics';
const Home = () => {

    const time = new Date().getTime();
    console.log(time);

    return (
        <div>
            <div className='my-14'>
                <h2 className='font-bold text-3xl text-center my-10'>Trending News</h2>
                <Slider></Slider>
                <h2 className='font-bold text-3xl text-center my-10'>Our Publishers</h2>
                <Publisher></Publisher>
                <h2 className='font-bold text-3xl text-center my-10'>Statistics</h2>
                <Statistics></Statistics>

            </div>
           
        </div>
    );
};

export default Home;