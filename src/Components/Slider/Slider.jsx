// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slider.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useAllNews from '../../Hooks/useAllNews';
import TrendSlider from './TrendSlider';
// import { useState } from 'react';


export default function App() {

     const [trend] = useAllNews();
    //  const [highest, setHighest] = useState([])
      
     const all = trend.sort((a,b) => a.views > b.views ? -1 : 1).map(data => data);
    
    return (
        <div>
            <Swiper
                id='swipe'
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                slidesPerView={1}
                spaceBetween={5}
                // pagination={{
                //     clickable: true,
                // }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                
                
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                all.slice(0,6).map(trending => <SwiperSlide key={trending._id}>
                    <TrendSlider key={trending._id} trending={trending}></TrendSlider>
                </SwiperSlide>)
            }
                
            </Swiper>
        </div>
    );
}
