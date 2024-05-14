import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/Spinner";
import UseCancelModal from "../../DashboardPage/MyOrders/useCancelModal";

const ManageAllTools = () => {
  const [cancelOrder, setCancelOrder] = useState([]);

  const {
    data: allUser,
    isLoading,
    refetch,
  } = useQuery("allusers", () =>
    fetch("https://woodie-manufature.onrender.com/purchase", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateStatus = (id) => {
    fetch(`https://woodie-manufature.onrender.com/updateStatus/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ status: "Spipped" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount > 0) {
          toast.success("The product has now gone for shipping", {
            autoClose: 1500,
          });
          refetch();
        }
      });
  };

  return (
    <section>
      <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">Update Your Profile Here</h1>
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
              <th className="bg-neutral">Payment</th>
              <th className="bg-neutral">Action</th>
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

                <td className="bg-accent space-x-5">
                  {detail.paid ? (
                    <label className="px-3 py-2 rounded-xl font-semibold bg-info">Paid</label>
                  ) : (
                    <label className="px-3 py-2 rounded-xl font-semibold bg-warning">Unpaid</label>
                  )}
                </td>

                <td className="bg-accent space-x-5">
                  {!detail.paid && (
                    <label htmlFor="cancelorder" onClick={() => setCancelOrder(detail)} className="btn btn-error btn-sm">
                      Cancel
                    </label>
                  )}
                </td>

                <td className="bg-accent space-x-5">
                  {detail.paid && detail.status && (
                    <button onClick={() => handleUpdateStatus(detail._id)} className="btn btn-success btn-sm">
                      {detail.status}
                    </button>
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

export default ManageAllTools;
