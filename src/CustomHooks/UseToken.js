import { useEffect, useState } from "react";

const UseToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const newUser = { name: user?.user?.displayName, email };

    if (email) {
      fetch(`https://shrouded-stream-85988.herokuapp.com/allRandomUsers?email=${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.result?.acknowledged) {
            localStorage.setItem("accessToken", data?.accessToken);
            setToken(data?.accessToken);
          }
        });
    }
  }, [user, token]);

  return [token];
};

export default UseToken;
