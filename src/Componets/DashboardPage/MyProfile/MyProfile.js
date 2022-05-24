import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import swal from "sweetalert";
import auth from "../../../firebase.init";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const { displayName, email } = user;

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const name = displayName;
    const education = e.target.edu.value;
    const location = e.target.location.value;
    const phone = e.target.phone.value;
    const profile = e.target.profile.value;

    if (!education || !location || !phone || !profile) {
      return toast.error("Please fiil up the form", {
        autoClose: 1500,
      });
    }

    const updatedUser = {
      name,
      email,
      education,
      location,
      phone,
      profile,
    };
    console.log(updatedUser);

    fetch(`http://localhost:5000/allRandomUsers?email=${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.result?.modifiedCount > 0 || data?.result?.upsertedCount) {
          swal("Congrats!", "Your Information was updated!", "success");
          e.target.reset();
        } else {
          swal("Ooops!", "Already updated!", "error");
        }
      });
  };

  return (
    <section>
      <form className="mx-auto space-y-3 lg:mt-20 mt-5 lg:w-[27rem]" onSubmit={handleUpdateProfile}>
        <div className="form-control">
          <input
            type="text"
            value={displayName}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="form-control">
          <input
            type="email"
            value={email}
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="form-control">
          <input
            name="edu"
            type="text"
            placeholder="Add Education"
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="form-control">
          <input
            name="location"
            type="text"
            placeholder="Add Location(city/district)"
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>
        <div className="form-control">
          <input
            name="phone"
            type="number"
            placeholder="Add Phone Number"
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>
        <div className="form-control">
          <input
            name="profile"
            type="url"
            placeholder="Add LinkedIn or other"
            className="input bg-neutral input-bordered font-semibold w-full"
          />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary btn-sm">Update Profile</button>
        </div>
      </form>
    </section>
  );
};

export default MyProfile;
