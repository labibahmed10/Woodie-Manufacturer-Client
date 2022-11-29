import React, { useState } from "react";

const UseCancelModal = ({ cancelOrder, setCancelOrder, refetch }) => {
   const { toolName, _id, avlQuan, quantity } = cancelOrder;

   const handleCancelOrder = (id) => {
      const newQuantity = avlQuan + quantity;
      cancelOrder = { ...cancelOrder, avlQuan: newQuantity };

      fetch(`https://woodie-manufacturer-server-production.up.railway.app/cancelOrder/${id}`, {
         method: "DELETE",
         headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            if (data?.deletedCount > 0) {
               refetch();
               setCancelOrder(null);
               // fetch(`https://woodie-manufacturer-server-production.up.railway.app/allTools/${_id}`, {
               //   method: "PUT",
               //   headers: {
               //     "content-type": "application/json", "authorization" : `bearer ${localStorage.getItem("accessToken")}` "authorization" : `bearer localStorage.getItem("accessToken")`
               //   },
               //   body: JSON.stringify(cancelOrder),
               // })
               //   .then((res) => res.json())
               //   .then((data) => {
               //
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
               <h3 className="text-lg font-bold">Are You Sure You Want To Cancel The Order For :-</h3>
               <p className="py-2">Name : {toolName}</p>
               <p>Quantity : {quantity}</p>
               <div className="flex justify-end">
                  <button onClick={() => handleCancelOrder(_id)} className="btn btn-primary btn-sm">
                     Yes,cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UseCancelModal;
