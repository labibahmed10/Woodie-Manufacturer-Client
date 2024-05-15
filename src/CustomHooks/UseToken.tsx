import { useEffect, useState } from "react";

const UseToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const newUser = { name: user?.user?.displayName, email };

    console.log("email", email);
    console.log("newUser", newUser);

    if (email) {
      fetch(`http://localhost:5000/user-info?email=${email}`, {
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
