import React, { useEffect, useState } from "react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/review.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="md:px-20 md:py-20 py-16 px-5 lg:mb-16 mb-5 text-secondary">
      <h1 className="text-center lg:text-5xl text-4xl pb-10 font-bold">
        Positive <span className="text-primary">Reviwes</span> From our <br /> valuable customers around the
        world
      </h1>

      <div className="h-[35rem]">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={3}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide>
              <div class="card w-96 bg-base-100 shadow-xl">
                <img className="px-32" src={review.image} alt="Shoes" />

                <figure class="px-5 pt-3">
                  <h2 class="text-2xl font-bold">{review.name}</h2>
                </figure>

                <div class="card-body text-left items-center">
                  <p>{review.text}</p>
                  <div class="rating rating-md mt-2">
                    <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-300" />
                    <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-300" />
                    <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-300" />
                    <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-300" />
                    <input type="radio" name="rating-7" class="mask mask-star-2 bg-orange-300" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewSection;
