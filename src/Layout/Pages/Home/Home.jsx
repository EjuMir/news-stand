import Plans from '../../../Components/Plans/Plans';
import Publisher from '../../../Components/Publisher/Publisher';
import Slider from '../../../Components/Slider/Slider'
import Statistics from '../../../Components/Statistics/Statistics';
const Home = () => {

    return (
        <div>
       
                <div className='my-24'>
                    <h2 className='font-bold text-3xl text-center my-10'>Trending News</h2>
                    <Slider></Slider>
                </div>
                <div className='mb-24'>
                    <h2 className='font-bold text-3xl text-center my-24'>Our Publishers</h2>
                    <Publisher></Publisher>
                </div>
                <div className='text-center mb-24'>
                    <h2 className='font-bold text-3xl text-center my-24'>Statistics</h2>
                    <Statistics></Statistics>
                </div>
                <div>
                    <h2 className='font-bold text-3xl text-center my-24'>Our Plans</h2>
                    <Plans></Plans>
                </div>

        </div>
    );
};

export default Home;