import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../../firebase.init";
import Spinner from "../../../Spinner/Spinner";

const MyOrders = () => {
  // const [personData, setPersonData] = useState([]);
  const [user] = useAuthState(auth);
  const { email } = user;

  // useEffect(() => {
  //   fetch(`http://localhost:5000/purchase?email=${email}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setPersonData(data));
  // }, [email]);

  const {
    data: personData,
    isLoading,
    refetch,
  } = useQuery(["personsData", email], () =>
    fetch(`http://localhost:5000/purchase?email=${email}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner />;
  }

  console.log(personData);
  return (
    <div class="overflow-x-auto">
      <table class="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr className="text-center">
            <th className="bg-neutral"></th>
            <th className="bg-neutral">Tools Name</th>
            <th className="bg-neutral">Email</th>

            <th className="bg-neutral">Quantity</th>
            <th className="bg-neutral">Action</th>
            {/* <th className="bg-neutral"></th> */}
          </tr>
        </thead>
        <tbody>
          {personData?.map((detail, i) => (
            <tr className="text-center">
              <th className="bg-accent">{i + 1}</th>
              <td className="bg-accent">{detail?.productName}</td>
              <td className="bg-accent">{detail?.email}</td>
              <td className="bg-accent">{detail?.quantity}</td>
              <td className="bg-accent space-x-5">
                <button className="btn btn-primary btn-sm">Cancel</button>
                <button className="btn btn-primary btn-sm">Cancel</button>
              </td>
              {/* <td className="bg-accent">Purple</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
