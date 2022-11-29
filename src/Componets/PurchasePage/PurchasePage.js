import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import auth from "../../firebase.init";
import Spinner from "../../Spinner/Spinner";

const PurchasePage = () => {
   const [user] = useAuthState(auth);
   const { id } = useParams();
   const [disable, setDisable] = useState(false);

   let {
      data: singleTool,
      refetch,
      isLoading,
   } = useQuery(["singleTool", id], () =>
      fetch(`https://woodie-manufacturer-server-production.up.railway.app/allTools/${id}`).then((res) => res.json()),
   );

   if (isLoading) {
      return <Spinner />;
   }

   const handlePurchaseTool = (e) => {
      e.preventDefault();

      const moq = singleTool?.moq;
      const availableQuantity = singleTool?.avlQuan;
      const userQuantity = +e.target.quantity.value;
      const adress = e.target.adress.value;
      const phone = +e.target.phone.value;
      const details = e.target.details.value;

      if (!adress || !userQuantity || !phone) {
         return toast("please fill up with your valuable information");
      }

      if (userQuantity < moq) {
         setDisable(true);
         return toast("You have to order minimum of MOQ", {
            autoClose: 1500,
         });
      }

      if (userQuantity > availableQuantity) {
         setDisable(true);
         return toast("Sorry we don't have this much equipments in stock! Contact us to know more", {
            autoClose: 1500,
         });
      }

      // calculating total cost of user for their tools
      const totalCost = userQuantity * singleTool?.pPerUnit;

      // also updating the quantity from ordered
      const updatedQuantity = availableQuantity - userQuantity;

      const buyerInfo = {
         name: user?.displayName,
         toolName: singleTool?.name,
         email: user?.email,
         adress,
         phone,
         details,
         quantity: userQuantity,
         avlQuan: updatedQuantity,
         totalCost,
      };

      singleTool = { ...singleTool, avlQuan: updatedQuantity };

      fetch(`https://woodie-manufacturer-server-production.up.railway.app/purchase`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify(buyerInfo),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data?.acknowledged) {
               fetch(`https://woodie-manufacturer-server-production.up.railway.app/allTools/${id}`, {
                  method: "PUT",
                  headers: {
                     "content-type": "application/json",
                     authorization: `bearer ${localStorage.getItem("accessToken")}`,
                  },
                  body: JSON.stringify(singleTool),
               })
                  .then((res) => res.json())
                  .then((data) => {
                     if (data?.modifiedCount > 0) {
                        refetch();
                     }
                     swal("Thank You!", "You have Successfully placed the order.Now you can pay by going to 'My order' page", "success");
                  });
            }
         });

      e.target.reset();
   };

   return (
      <section className="flex lg:flex-row flex-col items-center lg:justify-around lg:px-20 px-5 lg:py-20 py-16">
         <div className="lg:mt-40 flex flex-col items-center">
            <img className="w-80" src={singleTool?.image} alt="" />
            <p className="text-lg font-bold lg:pb-0 pb-4">
               <span className="text-gray-500">Product Name</span> : {singleTool?.name}
            </p>
         </div>

         <form className="flex lg:flex-row flex-col items-center justify-between gap-20 " onSubmit={handlePurchaseTool}>
            <div className="space-y-4 lg:mt-40  lg:w-[25rem]">
               <h1 className="text-center text-4xl font-bold">Hello {user?.displayName}</h1>

               <div className="form-control">
                  <input type="email" disabled defaultValue={user?.email} className="input input-bordered w-full font-semibold" />
               </div>

               <div className="form-control">
                  <input name="adress" type="text" placeholder="Your Adress" className="input input-bordered  w-full" />
               </div>

               <div className="form-control">
                  <input name="phone" type="number" placeholder="Your Phone" className="input input-bordered  w-full" />
               </div>

               <textarea name="details" className="textarea textarea-bordered w-full" placeholder="Write anything you want to clarify"></textarea>
            </div>

            <div className="space-y-1 lg:mt-40 text-secondary">
               <p className="text-xl font-bold ">
                  <span className="text-gray-500">MOQ(Minimum Order Quantity)</span> : {singleTool?.moq} pieces
               </p>
               <p className="text-xl font-bold">
                  <span className="text-gray-500">Available Quantity</span> : {singleTool?.avlQuan} pieces
               </p>
               <p className="text-xl font-bold">
                  <span className="text-gray-500">Product Per Unit</span> : ${singleTool?.pPerUnit} / piece
               </p>

               <div className="form-control pt-8">
                  <input name="quantity" type="number" defaultValue={singleTool.moq} className="input input-bordered  w-1/2 mx-auto" />

                  <div className="flex justify-center mt-5 gap-5">
                     <input disabled={disable} type="submit" className="btn btn-primary " value="Purchase" />
                     <input onClick={() => setDisable(false)} type="normal" className="btn btn-primary w-20" value="reset" />
                  </div>
               </div>
            </div>
         </form>
      </section>
   );
};

export default PurchasePage;
