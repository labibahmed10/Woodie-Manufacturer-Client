import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Spinner/Spinner";
import UseCancelModal from "../../DashboardPage/MyOrders/UseCancelModal";

const ManageAllTools = () => {
  const [cancelOrder, setCancelOrder] = useState([]);
  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery("allusers", () =>
    fetch("http://localhost:5000/purchase", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner />;
  }

  const deleteOrder = (id) => {
    console.log(id);
  };

  return (
    <div className="overflow-x-auto">
      {cancelOrder && (
        <UseCancelModal
          refetch={refetch}
          setCancelOrder={setCancelOrder}
          cancelOrder={cancelOrder}
        ></UseCancelModal>
      )}

      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr className="text-center">
            <th className="bg-neutral"></th>
            <th className="bg-neutral">Tools Name</th>
            <th className="bg-neutral">Email</th>

            <th className="bg-neutral">Quantity</th>
            <th className="bg-neutral">Payment</th>
            <th className="bg-neutral"></th>
            <th className="bg-neutral">Status</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((detail, i) => (
            <tr key={detail._id} className="text-center">
              <th className="bg-accent">{i + 1}</th>
              <td className="bg-accent">{detail?.toolName}</td>
              <td className="bg-accent">{detail?.email}</td>
              <td className="bg-accent">{detail?.quantity}</td>

              {detail.paid ? (
                <td className="bg-accent space-x-5">
                  <label className="btn btn-info btn-sm">Paid</label>
                </td>
              ) : (
                <td className="bg-accent space-x-5">
                  <label className="btn btn-warning btn-sm">Unpaid</label>
                </td>
              )}

              {!detail.paid && (
                <td className="bg-accent space-x-5">
                  <label
                    htmlFor="cancelorder"
                    onClick={() => setCancelOrder(detail)}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </label>
                </td>
              )}

              {!detail.paid && (
                <td className="bg-accent space-x-5">
                  <button className="btn btn-success btn-sm">{detail.status}pending</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAllTools;
