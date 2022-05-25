import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import swal from "sweetalert";
import Spinner from "../../../Spinner/Spinner";

const CheckoutForm = ({ purchaseInfo }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { totalCost, name, email, _id } = purchaseInfo;
  const price = totalCost;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
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

    // cofirm card intent

    // setting loader true
    setLoading(true);

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
      console.log(paymentIntent);

      fetch(`http://localhost:5000/purchasePaid/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ transictionID: paymentIntent?.id, paymentID: _id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data.modifiedCount > 1) {
            event.target.reset();
            swal(
              "Congrats!",
              `Your Payment Is Successful!,Your Transaction Id - ${paymentIntent.id}`,
              "success"
            );
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
