import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/Spinner";

const ImageApiSecret = " 9314728cfc25a2418af59e385a715f7a";

const AddATool = () => {
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);

  // getting the picture and setting in a state
  const handleImage = (e) => {
    setPicture(e.target.files[0]);
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  const handleAddProduct = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const avlQuan = +e.target.avlQuan.value;
    const moq = +e.target.moq.value;
    const pPerUnit = +e.target.pPerUnit.value;
    const desc = e.target.desc.value;
    const image = picture;

    if (!name || !avlQuan || !moq || !pPerUnit || !desc) {
      return toast.error("Please fill up the form", {
        autoClose: 1500,
      });
    }

    const formData = new FormData();
    formData.append("image", image);

    let toolInfo = {
      name,
      image,
      avlQuan,
      moq,
      pPerUnit,
      desc,
    };
    setLoading(true);
    // making image from file
    fetch(`https://api.imgbb.com/1/upload?key=${ImageApiSecret}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const image = res?.data?.url;

        if (res.success) {
          toolInfo = { ...toolInfo, image };

          fetch("http://localhost:5000/allTools", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(toolInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.acknowledged) {
                toast.success("New Tool Uploaded successfully", {
                  autoClose: 1500,
                });
                setLoading(false);
                e.target.reset();
              } else {
                toast.error("Failed to add a tool", {
                  autoClose: 1500,
                });
                e.target.reset();
              }
            });
        }
      });
  };

  return (
    <section>
      <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">Add A Tool Here</h1>
      <section className="lg:max-w-4xl p-3 lg:p-5 my-16 mt-0  mx-auto lg:space-y-4 space-y-2 border">
        <form action="" onSubmit={handleAddProduct}>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Name of the Tool?</span>
            </label>
            <input name="name" type="text" placeholder="Type here" class="input input-bordered " />
          </div>

          <div className="flex lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-2">
            <div class="form-control ">
              <label class="label">
                <span class="label-text font-semibold">Upload a Picture</span>
              </label>
              <input
                onChange={handleImage}
                name="image"
                type="file"
                placeholder="Type here"
                className="lg:w-[25rem] w-full border py-2 px-2 rounded-lg"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Available Quantity?</span>
              </label>
              <input
                name="avlQuan"
                type="number"
                placeholder="quantity"
                class="lg:w-[25rem] w-full input input-bordered "
              />
            </div>
          </div>

          <div className="flex lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-2">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Minimum Order Quantity?</span>
              </label>
              <input
                name="moq"
                type="number"
                placeholder="Moq"
                class="input input-bordered lg:w-[25rem] w-full"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Price Per Unit($)?</span>
              </label>
              <input
                name="pPerUnit"
                type="number"
                placeholder="price"
                class="input input-bordered lg:w-[25rem] w-full"
              />
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold">Describe about the tool</span>
            </label>
            <textarea name="desc" placeholder="Write Details" class="input input-bordered"></textarea>
          </div>

          <div className="flex justify-end mt-5">
            <button type="submit" className="btn btn-primary">
              Add Tool
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddATool;
