import React from "react";
import { useQuery } from "react-query";
import swal from "sweetalert";
import Spinner from "../../../Spinner/Spinner";

import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "../../../CustomHooks/useAdmin";
import auth from "../../../firebase.init";

const MakeAdmin = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("allRandomUsers", () =>
    fetch("https://shrouded-stream-85988.herokuapp.com/allRandomUsers", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner />;
  }

  const MakeAdmin = (email) => {
    fetch(`https://shrouded-stream-85988.herokuapp.com/allRandomUsers/admin?email=${email}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          swal("Congrats!", "This user was made as an 'Admin'", "success");
        }
      });
  };

  return (
    <section>
      <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">Make A Admin Here</h1>
      <div className="overflow-x-auto mx-5">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr className="text-center">
              <th className="bg-neutral">Serial</th>
              <th className="bg-neutral">Name</th>
              <th className="bg-neutral">Email</th>
              <th className="bg-neutral">Action</th>
              <th className="bg-neutral"></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={i} className="hover text-center">
                <th className="bg-accent">{i + 1}</th>
                <td className="bg-accent">{user?.name}</td>
                <td className="bg-accent">{user?.email}</td>
                <td className="bg-accent">
                  {user?.role !== "admin" && (
                    <button onClick={() => MakeAdmin(user?.email)} className="btn btn-sm btn-primary">
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="bg-accent">
                  <button className="btn btn-sm">Delete User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MakeAdmin;
