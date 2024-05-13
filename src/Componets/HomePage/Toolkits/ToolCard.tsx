import React from "react";
import { useNavigate } from "react-router-dom";

const ToolCard = ({ tool }) => {
  const { image, desc, moq, avlQuan, pPerUnit, name, _id } = tool;
  const navigate = useNavigate();

  return (
    <div className="card card-compact lg:w-96 w-full bg-accent shadow-xl h-full">
      <figure>
        <img className="w-72 h-64 py-2" src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl mx-auto">{name}</h2>
        <p className="font-semibold text-lg">{desc}</p>
        <p className="font-semibold">
          MOQ : <span className="text-lg">{moq}</span> pieces
        </p>
        <p className="font-semibold">
          Available : <span className="text-lg">{avlQuan}</span> pieces
        </p>
        <p className="font-semibold">
          Price Per Unit : <span className="text-lg"> ${pPerUnit}</span> / piece
        </p>
        <div className="card-actions justify-end">
          <button onClick={() => navigate(`/purchase/${_id}`)} className="btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
