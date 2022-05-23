import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Spinner from "../../../Spinner/Spinner";
import UseCancelModal from "./UseCancelModal";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [cancelOrder, setCancelOrder] = useState([]);
  const navigate = useNavigate();
  const { email } = user;

  const {
    data: personData,
    isLoading,
    refetch,
  } = useQuery(["personsData", email], () =>
    fetch(`http://localhost:5000/purchase?email=${email}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div class="overflow-x-auto">
      {cancelOrder && (
        <UseCancelModal
          refetch={refetch}
          setCancelOrder={setCancelOrder}
          cancelOrder={cancelOrder}
        ></UseCancelModal>
      )}
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr className="text-center">
            <th className="bg-neutral"></th>
            <th className="bg-neutral">Tools Name</th>
            <th className="bg-neutral">Email</th>

            <th className="bg-neutral">Quantity</th>
            <th className="bg-neutral">Action</th>
            {/* <th className="bg-neutral"></th> */}
          </tr>
        </thead>
        <tbody>
          {personData?.map((detail, i) => (
            <tr key={detail._id} className="text-center">
              <th className="bg-accent">{i + 1}</th>
              <td className="bg-accent">{detail?.toolName}</td>
              <td className="bg-accent">{detail?.email}</td>
              <td className="bg-accent">{detail?.quantity}</td>
              <td className="bg-accent space-x-5">
                <label
                  onClick={() => setCancelOrder(detail)}
                  for="cancelorder"
                  class="btn btn-primary btn-sm"
                >
                  Cancel
                </label>
                <button
                  onClick={() => navigate(`/dashboard/payment/${detail._id}`)}
                  className="btn btn-success btn-sm"
                >
                  Pay
                </button>
              </td>
              {/* <td className="bg-accent">Purple</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
