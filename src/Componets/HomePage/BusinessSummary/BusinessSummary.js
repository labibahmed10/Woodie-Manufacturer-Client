import React from "react";

import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlinePlus, AiOutlineFlag } from "react-icons/ai";
import { SiExpensify } from "react-icons/si";
import { FaHandSparkles } from "react-icons/fa";

const BusinessSummary = () => {
  return (
    <section className="md:px-20 md:py-20 py-16 px-5 bg-neutral lg:mb-16 mb-5 text-secondary">
      <h1 className="text-center lg:text-5xl text-3xl lg:pb-4 pb-2 font-bold uppercase">
        Billions of <span className="text-primary">Customer Rely </span>On Us
      </h1>

      <p className="text-center lg:text-3xl text-xl lg:pb-20 pb-10 font-semibold uppercase">
        users <span className="text-primary">satisfaction is important</span> to us
      </p>

      <div className="grid lg:grid-cols-4 grid-cols-1 place-items-center gap-10 ">
        <div className="flex flex-col items-center">
          <p className="text-6xl">
            <AiOutlineFlag />
          </p>
          <p className="flex items-center text-5xl font-bold">60+</p>
          <p className="text-2xl font-semibold">Countries</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-6xl">
            <SiExpensify />
          </p>
          <p className="flex items-center text-5xl font-bold">18+</p>
          <p className="text-2xl font-semibold">Years of Experience</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-6xl">
            <MdOutlinePeopleAlt />
          </p>
          <p className="flex items-center text-5xl font-bold">580+</p>
          <p className="text-2xl font-semibold">Happy Clients</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-6xl">
            <FaHandSparkles />
          </p>
          <p className="flex items-center text-5xl font-bold">415+</p>
          <p className="text-2xl font-semibold">Positive Feedbacks</p>
        </div>
      </div>
    </section>
  );
};

export default BusinessSummary;
