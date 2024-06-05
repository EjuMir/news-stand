// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slider.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
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
                spaceBetween={10}
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
                <SwiperSlide><img src="https://th.bing.com/th/id/R.f130ff77f75101067d9cc5818e307ca7?rik=Fw6L%2bImNwU%2bSaw&riu=http%3a%2f%2ftesseraguild.com%2fwp-content%2fuploads%2f2018%2f06%2fHobbit.jpg&ehk=0xpERpQ3Zvv7CZHZts86OPPva7nqdaM33H9h%2b932pG0%3d&risl=&pid=ImgRaw&r=0" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://images.thenile.io/r1000/9781444910582.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://images.squarespace-cdn.com/content/v1/59e235dcd7bdcec81eb68962/1575923349583-5KH4TDVO8RXU4XBNSI0M/ke17ZwdGBToddI8pDm48kD755XqWqn8HkRX8WSTt5GJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1URwn7vetbNoOrjGqAVoZN5bz1XPY0_Ev1nDpBBPOnwUda4oDI66FEaoPF3aKRzQZjg/Historical+Fiction+Where+the+Light+Enters+by+Sara+Donati.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://images.squarespace-cdn.com/content/v1/59e235dcd7bdcec81eb68962/1575923349157-3BNDH7JR5UF7ZU0A5A48/ke17ZwdGBToddI8pDm48kJTNl5E2hijD7J-sESO_BVN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ue3pExvFiO6E9rv2lljq9S2_mVV9EJlaTc_26ArkrjDTJilkUu7eIyBb-AQDEk_nZw/Historical+Fiction+The+Sound+of+the+Hours+by+Karen+Campbell.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://s-i.huffpost.com/gen/1148926/images/o-CLASSIC-BOOKS-ORIGINAL-COVERS-facebook.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img src="https://img.apmcdn.org/68769620813bb6a36eb287c5cbd37edf91f83183/uncropped/8e7ed9-20140106-fahrenheit451.jpg" alt="" /></SwiperSlide>
            </Swiper>
        </div>
    );
}
