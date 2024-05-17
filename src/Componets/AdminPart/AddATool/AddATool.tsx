import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../../Spinner/Spinner";
const ImageApiSecret = import.meta.env.VITE_APP_IMGSECRET;

const AddATool = () => {
  const [picture, setPicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // getting the picture and setting in a state
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setPicture(files[0]);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: any };
      avlQuan: { value: string | number };
      moq: { value: string | number };
      pPerUnit: { value: string | number };
      desc: { value: any };
      reset: () => void;
    };

    const name = target.name.value;
    const avlQuan = +target.avlQuan.value;
    const moq = +target.moq.value;
    const pPerUnit = +target.pPerUnit.value;
    const desc = target.desc.value;
    const image = picture;

    if (!name || !avlQuan || !moq || !pPerUnit || !desc) {
      return toast.error("Please fill up the form", {
        autoClose: 1500,
      });
    }

    const formData = new FormData();
    formData.append("image", image as any);

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
        if (res?.status_code) {
          toast.warn("Try uploading image again", {
            autoClose: 1500,
          });
          setLoading(false);
        }

        console.log("Image res", res);
        const image = res?.data?.url;

        if (res.success) {
          toolInfo = { ...toolInfo, image };
          console.log("toolInfo", toolInfo);
          fetch("http://localhost:5000/create-tool", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(toolInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.success) {
                toast.success(data?.message, {
                  autoClose: 1500,
                });
                setLoading(false);
                target.reset();
              }

              if (!data.success) {
                toast.error(data?.errorMessage, {
                  autoClose: 1500,
                });
                target.reset();
                setLoading(false);
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
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Name of the Tool?</span>
            </label>
            <input name="name" type="text" placeholder="Type here" className="input input-bordered " />
          </div>

          <div className="flex lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-2">
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-semibold">Upload a Picture</span>
              </label>
              <input
                onChange={handleImage}
                name="image"
                type="file"
                placeholder="Type here"
                className="lg:w-[25rem] w-full border py-2 px-2 rounded-lg"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Available Quantity?</span>
              </label>
              <input name="avlQuan" type="number" placeholder="quantity" className="lg:w-[25rem] w-full input input-bordered " />
            </div>
          </div>

          <div className="flex lg:justify-between lg:flex-row flex-col lg:space-y-0 space-y-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Minimum Order Quantity?</span>
              </label>
              <input name="moq" type="number" placeholder="Moq" className="input input-bordered lg:w-[25rem] w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Price Per Unit($)?</span>
              </label>
              <input name="pPerUnit" type="number" placeholder="price" className="input input-bordered lg:w-[25rem] w-full" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Describe about the tool</span>
            </label>
            <textarea name="desc" placeholder="Write Details" className="input input-bordered"></textarea>
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
