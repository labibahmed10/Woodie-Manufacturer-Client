import { ChangeEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import swal from "sweetalert";
import auth from "../../../firebase.init";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [ratings, setRatings] = useState(5);
  const { displayName, photoURL } = user as User;

  const handleReview = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = e.target.message.value;

    if (!text) {
      return toast.error("Please give a review", {
        autoClose: 1500,
      });
    }

    const review = {
      name: displayName,
      ratings: ratings,
      image: photoURL || "https://th.bing.com/th?id=OIP.p_-XBDaYYHdPmwp60BZYKwHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2",
      text,
    };

    fetch(`https://woodie-manufacturer-server.vercel.app/review-create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          swal("Thank You!", "We are privilleged to have your review 😀", "success");

          e.target.reset();
        }
      });
  };

  return (
    <section className="mx-auto lg:mt-20 lg:max-w-3xl">
      <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">Give us a review</h1>
      <form onSubmit={handleReview} className="space-y-3">
        <div className="form-control">
          <input type="text" value={displayName as string} className="input input-bordered bg-neutral font-semibold w-full" />
        </div>
        <div>
          <label htmlFor="" className="label font-semibold">
            Give us any kind of reviews & Suggestion
          </label>
          <textarea name="message" className="textarea textarea-bordered w-full" placeholder="Description"></textarea>
        </div>

        <div className="form-control">
          <label className="label">How Would You Rate Us?</label>
          <div onChange={(e) => setRatings(+(e.target as any).value)} className="rating rating-md">
            <input type="radio" value="1" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="2" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="3" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="4" name="rating-7" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="5" name="rating-7" className="mask mask-star-2 bg-orange-400" />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary btn-sm">Add Review</button>
        </div>
      </form>
    </section>
  );
};

export default AddReview;
