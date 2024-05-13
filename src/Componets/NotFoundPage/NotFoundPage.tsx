import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="h-[90vh] flex flex-col items-center justify-center text-gray-700">
      <img className="md:h-[25rem] h-[10rem]" src="https://i.postimg.cc/MpKLxGrR/404.png" alt="" />

      <h1 className="lg:text-4xl text-2xl font-semibold mt-8 py-2">Ooops! This Page is Not Found</h1>
      <p>The Requested page doesn't exist</p>

      <button
        onClick={() => navigate("/home")}
        className="flex items-center px-6 mt-5 py-3 border border-secondary hover:bg-secondary duration-300 hover:text-[aliceblue]"
      >
        <FaHome className="mr-2 text-2xl"></FaHome> Back to Home
      </button>
    </section>
  );
};

export default NotFoundPage;
