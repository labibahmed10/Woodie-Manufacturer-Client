import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [ratings, setRatings] = useState(5);
  const { displayName, photoURL } = user;

  const handleReview = (e) => {
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
      image: photoURL,
      text,
    };

    fetch(`http://localhost:5000/allReviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <section className="mx-auto lg:mt-20 lg:w-[27rem]">
      <form onSubmit={handleReview} className="space-y-4">
        <div class="form-control">
          <input type="text" value={displayName} class="input bg-neutral font-semibold w-full" />
        </div>
        <textarea
          name="message"
          class="textarea textarea-bordered w-full"
          placeholder="Description"
        ></textarea>

        <div class="form-control">
          <label className="label">How Would You Rate Us?</label>
          <div onChange={(e) => setRatings(+e.target.value)} class="rating rating-md">
            <input type="radio" value="1" name="rating-7" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="2" name="rating-7" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="3" name="rating-7" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="4" name="rating-7" class="mask mask-star-2 bg-orange-400" />
            <input type="radio" value="5" name="rating-7" class="mask mask-star-2 bg-orange-400" />
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
