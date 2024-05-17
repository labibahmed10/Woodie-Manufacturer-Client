import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { IPurchaseInfo } from "../../AdminPart/ManageToolsPayment/ManageToolsPayment";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const [purchaseInfo, setPurchaseInfo] = useState<IPurchaseInfo>({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/purchase-info/${id}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setPurchaseInfo(data);
      });
  }, [id]);

  return (
    <section className="px-2 lg:px-0">
      <div className="mx-auto lg:mt-20 mt-5 lg:max-w-3xl">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Your Name</span>
          </label>
          <input type="text" defaultValue={purchaseInfo?.name} className="input bg-neutral input-bordered font-semibold w-full" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Your Email</span>
          </label>
          <input type="email" defaultValue={purchaseInfo?.email} className="input bg-neutral input-bordered font-semibold  w-full" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Tool You Ordered</span>
          </label>
          <input type="text" defaultValue={purchaseInfo?.toolName} className="input bg-neutral input-bordered font-semibold w-full" />
        </div>

        <div className="flex justify-between gap-5">
          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Number Of Quantity</span>
            </label>
            <input type="text" defaultValue={purchaseInfo?.quantity} className="input bg-neutral input-bordered font-semibold w-full" />
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Total Price</span>
            </label>
            <input type="text" defaultValue={purchaseInfo?.totalCost} className="input bg-neutral input-bordered font-semibold w-full" />
          </div>
        </div>

        <div>
          <p className="text-gray-500 my-2">You can pay with</p>
          <div className="flex items-center gap-2">
            <input type="radio" name="radio-1" className="radio w-5 h-5" defaultChecked />
            <p className="flex items-center gap-1 font-bold">
              <FaCreditCard /> Credit Cart
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm purchaseInfo={purchaseInfo as IPurchaseInfo} />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
