import { EffectFade, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HomeBanner.css";
const HomeBanner = () => {
  return (
    <div className="h-[38rem] mb-16">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        // navigation={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loopFillGroupWithBlank={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="relative " src="https://i.ibb.co/z2c6b36/banner.webp" alt="" />

          <div className="absolute">
            <h1 className="text-primary lg:text-5xl text-3xl font-semibold uppercase">
              We have one the bestest Manufacturing <br /> factory over the world
            </h1>
            <button className="mt-8 py-2 px-3 font-semibold border border-accent hover:bg-accent hover:text-black text-white duration-300">
              Visit Us
            </button>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <img className="relative" src="https://i.ibb.co/QvZVm9y/banner2.jpg" alt="" />

          <div className="absolute">
            <h1 className="text-primary lg:text-5xl text-3xl font-semibold uppercase">
              The most important thing we <br /> build is trust
            </h1>
            <button className="mt-8 py-2 px-3 font-semibold border border-accent hover:bg-accent hover:text-black text-white duration-300">
              Visit Us
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-[20rem] md:h-auto" src="https://i.ibb.co/5Kg5jR3/banner3.jpg" alt="" />

          <div className="absolute">
            <h1 className="text-primary lg:text-5xl text-3xl font-semibold uppercase">
              We provide high quality materials for users to
              <br /> make their wooden things perfectly
            </h1>
            <button className="mt-8 py-2 px-3 font-semibold border border-accent hover:bg-accent hover:text-black text-white duration-300">
              Visit Us
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeBanner;
