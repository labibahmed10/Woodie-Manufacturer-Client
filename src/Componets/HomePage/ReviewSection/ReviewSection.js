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
    fetch("http://localhost:5000/allReviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="md:px-20 md:py-20 py-16 px-5 lg:mb-16 mb-5 text-secondary">
      <h1 className="text-center lg:text-5xl text-4xl pb-10 font-bold">
        Positive <span className="text-primary">Reviwes</span> From our <br /> valuable customers around the
        world
      </h1>

      <div className="lg:h-[35rem] py-10">
        <Swiper
          // slidesPerView={2}
          spaceBetween={30}
          // slidesPerGroup={3}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="card lg:w-[30rem] h-full w-full bg-base-100 shadow-xl">
                <img className="px-32" src={review.image} alt="Shoes" />

                <figure className="px-5 pt-3">
                  <h2 className="text-2xl font-bold">{review.name}</h2>
                </figure>

                <div className="card-body text-left items-center h-full">
                  <p>{review.text}</p>

                  <div className="rating rating-md mt-2">
                    {[...Array(review?.ratings).keys()].map((rating) => (
                      <input
                        key={rating}
                        type="radio"
                        name="rating-7"
                        className="mask mask-star-2 bg-orange-300"
                      />
                    ))}
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
