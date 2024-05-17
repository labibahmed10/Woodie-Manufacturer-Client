import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdmin = (user: User) => {
  const [admin, setAdmin] = useState(false);
  const [aLoading, setaLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const email = user?.email;

    if (email) {
      fetch(`https://woodie-manufacturer-server.vercel.app/admin?email=${email}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            navigate("/home");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.data) {
            setAdmin(data?.data);
            setaLoading(false);
          }
        });
    }
  }, [user, admin]);

  return [admin, aLoading];
};

export default useAdmin;
