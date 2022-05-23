import { useEffect, useState } from "react";

const UseToken = (user) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const newUser = { name: user?.user?.displayName, email };

    if (email) {
      fetch(`http://localhost:5000/randomUsers?email=${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.result?.acknowledged) {
            localStorage.setItem("accessToken", data?.accessToken);
            setToken(token);
          }
        });
    }
  }, [user, token]);

  return [token];
};

export default UseToken;
