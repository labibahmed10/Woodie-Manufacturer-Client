import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Spinner from "../../../Spinner/Spinner";
import UseCancelModal from "./useCancelModal";
import { User } from "firebase/auth";
import { IPurchaseInfo } from "../../AdminPart/ManageToolsPayment/ManageToolsPayment";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [cancelOrder, setCancelOrder] = useState({});
  const navigate = useNavigate();
  const { email } = user as User;

  const {
    data: personData,
    isLoading,
    refetch,
  } = useQuery(["personsData", email], () =>
    fetch(`http://localhost:5000/purchase-by-email?email=${email}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => data)
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">All The Orders You Have Done</h1>
      <div className="overflow-x-auto">
        {cancelOrder && <UseCancelModal refetch={refetch} setCancelOrder={setCancelOrder} cancelOrder={cancelOrder}></UseCancelModal>}
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-center">
              <th className="bg-neutral"></th>
              <th className="bg-neutral">Tools Name</th>
              <th className="bg-neutral">Email</th>

              <th className="bg-neutral">Quantity</th>
              <th className="bg-neutral">Action</th>
              <th className="bg-neutral">Status</th>
              <th className="bg-neutral">Transiction ID</th>
            </tr>
          </thead>
          <tbody>
            {personData?.map((detail: IPurchaseInfo, i: number) => (
              <tr key={detail._id} className="text-center">
                <th className="bg-accent">{i + 1}</th>
                <td className="bg-accent">{detail?.toolName}</td>
                <td className="bg-accent">{detail?.email}</td>
                <td className="bg-accent">{detail?.quantity}</td>
                <td className="bg-accent ">
                  {!detail.paid && (
                    <label onClick={() => setCancelOrder(detail)} htmlFor="cancelorder" className="btn btn-primary btn-sm">
                      Cancel
                    </label>
                  )}
                </td>
                <td className="bg-accent">
                  {detail.paid ? (
                    <span className="text-green-500 px-3">Paid</span>
                  ) : (
                    <button onClick={() => navigate(`/dashboard/payment/${detail._id}`)} className="btn btn-success btn-sm">
                      Pay
                    </button>
                  )}
                </td>
                <td className="bg-accent">
                  {detail?.transictionID ? (
                    <span className="text-green-500 px-3">{detail?.transictionID}</span>
                  ) : (
                    <span className="text-red-600 px-3 font-semibold">Null</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyOrders;
