import React from "react";

import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlinePlus, AiOutlineFlag } from "react-icons/ai";
import { SiExpensify } from "react-icons/si";
import { FaHandSparkles } from "react-icons/fa";

const BusinessSummary = () => {
  return (
    <section className="lg:py-20 py-10">
      <div className="bg-neutral text-secondary lg:py-20 py-14 lg:px-20 px-5">
        <h1 className="text-center lg:text-4xl text-2xl lg:pb-4 pb-2 font-bold uppercase">
          What Makes Us <span className="text-primary">Different from other</span> tool Manufacturers?
        </h1>

        <p className="text-center lg:text-2xl text-xl lg:pb-20 pb-10 font-semibold uppercase">
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
      </div>
    </section>
  );
};

export default BusinessSummary;
