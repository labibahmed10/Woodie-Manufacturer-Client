import React from "react";

const WhyChooseUsPage = () => {
  return (
    <section
      style={{ backgroundImage: `url(${"https://i.ibb.co/dkxGBZZ/slider-3.webp"})` }}
      className="bg-no-repeat bg-cover lg:h-[35rem]  lg:px-20 px-5 py-10 my-20 text-white"
    >
      <h1 className="lg:text-5xl text-3xl text-center py-5 font-bold">Why Choose Us?</h1>

      <p className="text-center">
        Ever since, we have dedicated ourselves to making industrial Hand tools with the goal to become the
        best manufacturers of Hand Tools in the World. Here’s some reasons why we’re unique
      </p>

      <div className="flex md:flex-row flex-col items-center md:justify-evenly gap-12 text-center text-xl font-semibold mt-10">
        <div>
          <img className="w-32 mx-auto" src="https://i.ibb.co/vd1nYHN/pngegg-5.png" alt="" />
          <h2 className="py-2">Service & Support</h2>
          <p>
            We have invested heavily to ensure that our products, processes and customer service are second to
            none.
          </p>
        </div>
        <div>
          <img className="w-32 mx-auto" src="https://i.ibb.co/58THWhm/pngegg-3.png" alt="" />
          <h2 className="py-2">Quality</h2>
          <p>
            We have developed a culture of continuous improvement. We give guarantee against any manufacturing
            defect.
          </p>
        </div>

        <div>
          <img className="w-32 mx-auto" src="https://i.ibb.co/BZ68vkQ/pngegg-2.png" alt="" />
          <h2 className="py-2">Expertise & Innovation</h2>
          <p>Since 1978 we’ve been supplying the highest quality tools to a variety of specialist markets.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsPage;
