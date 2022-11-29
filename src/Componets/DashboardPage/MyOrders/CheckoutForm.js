import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import Spinner from "../../../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ purchaseInfo }) => {
   const [cardError, setCardError] = useState("");
   const [clientSecret, setClientSecret] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const stripe = useStripe();
   const elements = useElements();

   const { totalCost, name, email, _id } = purchaseInfo;
   const price = totalCost;

   useEffect(() => {
      fetch("https://woodie-manufacturer-server-production.up.railway.app/create-payment-intent", {
         method: "POST",
         headers: {
            "content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
         body: JSON.stringify({ price }),
      })
         .then((res) => res.json())
         .then((data) => {
            if (data?.clientSecret) {
               setClientSecret(data.clientSecret);
            }
         });
   }, [price]);

   if (loading) {
      return <Spinner />;
   }

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);

      if (elements == null) {
         return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      setCardError(error?.message || "");

      // setting loader true
      setLoading(true);

      // cofirm card intent payment
      const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               name: name,
               email: email,
            },
         },
      });

      if (intentError) {
         setCardError(intentError.message);
      } else {
         const paymentInfo = {
            transictionID: paymentIntent?.id,
            paymentID: _id,
            status: "Pending",
         };

         fetch(`https://woodie-manufacturer-server-production.up.railway.app/purchasePaid/${_id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(paymentInfo),
         })
            .then((res) => res.json())
            .then((data) => {
               if (data.modifiedCount > 0) {
                  setLoading(false);
                  swal("Congrats!", `Your Payment Is Successful!,Your Transaction Id - ${paymentIntent.id}`, "success");
                  navigate("/dashboard/myorder");
               }
            });
      }
   };

   return (
      <form onSubmit={handleSubmit} className="py-3">
         <div className="form-control">
            <div className="input input-bordered py-3">
               <CardElement
                  options={{
                     style: {
                        base: {
                           fontSize: "17px",
                           color: "#424770",
                           "::placeholder": {
                              color: "#aab7c4",
                           },
                        },
                        invalid: {
                           color: "#9e2146",
                        },
                     },
                  }}
               />
            </div>

            {cardError && <p className="text-red-500">{cardError}</p>}

            <div className="flex justify-end pt-3">
               <button className=" btn btn-primary" type="submit" disabled={!stripe || !clientSecret}>
                  Pay
               </button>
            </div>
         </div>
      </form>
   );
};

export default CheckoutForm;
