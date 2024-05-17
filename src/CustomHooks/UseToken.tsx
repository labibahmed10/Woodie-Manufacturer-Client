import { UserCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UseToken = (user: UserCredential | undefined) => {
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const email = user?.user?.email;
    const newUser = { name: user?.user?.displayName, email };

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
          if (data?.success) {
            localStorage.setItem("accessToken", data?.data?.accessToken);
            setToken(data?.data?.accessToken);
            navigate("/dashboard/myprofile");
          }
        });
    }
  }, [user, token]);

  return [token];
};

export default UseToken;
