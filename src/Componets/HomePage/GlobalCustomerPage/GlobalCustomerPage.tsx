import React from "react";
import { MdVerticalDistribute } from "react-icons/md";

const GlobalCustomerPage = () => {
  return (
    <section className="lg:px-20 px-5 lg:py-28 py-12">
      <h1 className="lg:text-5xl text-2xl text-center font-bold lg:pb-5 pb-2">
        Our Global Customer <span className="text-primary">Base</span>
      </h1>

      <div className="divider text-5xl">
        <MdVerticalDistribute />
      </div>
      <div>
        <img className="lg:w-fit w-full mx-auto" src="https://i.ibb.co/xL5kc5h/map.jpg" alt="" />
      </div>
    </section>
  );
};

export default GlobalCustomerPage;
