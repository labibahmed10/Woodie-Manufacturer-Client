import React, { useState } from "react";

const UseCancelModal = ({ cancelOrder, setCancelOrder, refetch }) => {
  const { toolName, _id, avlQuan, quantity } = cancelOrder;

  const handleCancelOrder = () => {
    const newQuantity = avlQuan + quantity;
    cancelOrder = { ...cancelOrder, avlQuan: newQuantity };
    console.log(cancelOrder);

    fetch(`http://localhost:5000/cancelOrder/${_id}`, {
      method: "DELETE",
      headers: {
        authorizaion: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount > 0) {
          refetch();
          setCancelOrder(null);
          // fetch(`http://localhost:5000/allTools/${_id}`, {
          //   method: "PUT",
          //   headers: {
          //     "content-type": "application/json", "authorization" : `bearer ${localStorage.getItem("accessToken")}` "authorization" : `bearer localStorage.getItem("accessToken")`
          //   },
          //   body: JSON.stringify(cancelOrder),
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     console.log(data);
          //     // if (data?.modifiedCount > 0) {
          //     //   refetch();
          //     // }
          //   });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="cancelorder" className="modal-toggle" />
      <div className="modal text-secondary">
        <div className="modal-box relative">
          <label htmlFor="cancelorder" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Are You Sure You Want To Cancel Your Order For :-</h3>
          <p className="py-4">Name : {toolName}</p>
          <div className="flex justify-end">
            <button onClick={handleCancelOrder} className="btn btn-primary btn-sm">
              Yes,cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCancelModal;
