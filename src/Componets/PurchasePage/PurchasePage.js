import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const PurchasePage = () => {
  const [singleTool, setSingleTool] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [disable, setDisable] = useState(false);

  // console.log(id);
  useEffect(() => {
    fetch(`http://localhost:5000/allTools/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleTool(data));
  }, [id]);

  const handlePurchaseTool = (e) => {
    e.preventDefault();

    const moq = singleTool?.moq;
    const availableQuantity = singleTool?.avlQuan;
    const quantity = +e.target.quantity.value;
    const adress = e.target.adress.value;
    const phone = +e.target.phone.value;
    const details = e.target.details.value;

    if (!adress || !quantity || !phone) {
      return toast("please fill up with your valuable information");
    }

    if (quantity < moq) {
      return toast("You have to order minimum of MOQ", {
        autoClose: 1500,
      });
    }

    if (quantity > availableQuantity) {
      return toast("Sorry we don't have this much equipments in stock! Contact us to know more", {
        autoClose: 1500,
      });
    }

    const buyerInfo = {
      name: user?.displayName,
      email: user?.email,
      adress,
      phone,
      details,
      quantity,
    };

    console.log(buyerInfo);
  };

  return (
    <section className="flex lg:flex-row flex-col items-center justify-around lg:px-20 px-5 lg:py-20 py-16">
      <div className="lg:mt-40 flex flex-col items-center">
        <img className="w-80" src={singleTool?.image} alt="" />
        <p className="text-lg font-bold">
          <span className="text-gray-500">Product Name</span> : {singleTool?.name}
        </p>
      </div>

      <form
        className="flex lg:flex-row flex-col items-center justify-between gap-20"
        onSubmit={handlePurchaseTool}
      >
        <div className="space-y-4 lg:mt-40 lg:w-[25rem] ">
          <h1 className="text-center text-4xl font-bold">Hello {user?.displayName}</h1>

          <div class="form-control">
            <input
              type="email"
              disabled
              defaultValue={user?.email}
              class="input input-bordered w-full font-semibold"
            />
          </div>

          <div class="form-control">
            <input name="adress" type="text" placeholder="Your Adress" class="input input-bordered  w-full" />
          </div>

          <div class="form-control">
            <input name="phone" type="number" placeholder="Your Phone" class="input input-bordered  w-full" />
          </div>

          <textarea
            name="details"
            class="textarea textarea-bordered w-full"
            placeholder="Write anything you want to clarify"
          ></textarea>
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

          <div class="form-control pt-8">
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              class="input input-bordered  w-1/2 mx-auto"
            />

            <input type="submit" className="btn btn-primary w-30 mx-auto mt-5" value="Purchase" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default PurchasePage;
