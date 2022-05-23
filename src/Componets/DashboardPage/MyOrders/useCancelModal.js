import React, { useState } from "react";

const UseCancelModal = ({ cancelOrder, setCancelOrder, refetch }) => {
  const { toolName, _id, avlQuan, quantity } = cancelOrder;

  const handleCancelOrder = () => {
    const newQuantity = avlQuan + quantity;
    cancelOrder = { ...cancelOrder, avlQuan: newQuantity };
    console.log(cancelOrder);

    fetch(`http://localhost:5000/cancelOrder/${_id}`, {
      method: "DELETE",
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
          //     "content-type": "application/json",
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
      <input type="checkbox" id="cancelorder" class="modal-toggle" />
      <div class="modal text-secondary">
        <div class="modal-box relative">
          <label for="cancelorder" class="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 class="text-lg font-bold">Are You Sure You Want To Cancel Your Order For :-</h3>
          <p class="py-4">Name : {toolName}</p>
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
