import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
const PaymentPage = () => {
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:5000/purchase/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchaseInfo(data);
      });
  }, [id]);

  console.log(purchaseInfo);
  return (
    <section className="px-2">
      <div className="mx-auto space-y-3 lg:mt-20 mt-5 lg:w-[27rem]">
        <div className="form-control">
          <input
            type="text"
            value={purchaseInfo?.name}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="form-control">
          <input
            type="email"
            value={purchaseInfo?.email}
            className="input bg-neutral input-bordered font-semibold  w-full"
          />
        </div>

        <div className="form-control">
          <input
            bg-neutral
            input
            bg-neutral-bordered
            type="text"
            value={`Tool : ${purchaseInfo?.toolName}`}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="flex gap-5">
          <input
            bg-neutral
            input
            bg-neutral-bordered
            type="text"
            value={`${purchaseInfo?.quantity} pieces`}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
          <input
            bg-neutral
            input
            bg-neutral-bordered
            type="text"
            value={`$ ${purchaseInfo?.totalCost}`}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div>
          <p className="text-gray-500 mb-2">You can pay with</p>
          <div className="flex items-center gap-2">
            <input
              bg-neutral
              input
              bg-neutral-bordered
              type="radio"
              name="radio-1"
              className="radio w-5 h-5"
              checked
            />
            <p className="flex items-center gap-1 font-bold">
              <FaCreditCard /> Credit Cart
            </p>
          </div>

          <div className="form-control">
            <input
              bg-neutral
              input
              bg-neutral-bordered
              type="text"
              placeholder="card Number"
              className="input bg-neutral input-bordered font-semibold w-full my-4"
            />
          </div>

          {/* <div className="flex gap-5">
            <input bg-neutral input bg-neutral-bordered type="text" placeholder="card Number" className="input bg-neutral input-bordered font-semibold w-full" />
            <input bg-neutral input bg-neutral-bordered type="text" placeholder="card Number" className="input bg-neutral input-bordered font-semibold w-full" />
          </div> */}

          <div className="flex justify-between items-center font-bold">
            <p>Your Total Cost Will Be ${purchaseInfo?.totalCost}</p>
            <button className="btn btn-primary btn-md lg:w-28">Pay</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
