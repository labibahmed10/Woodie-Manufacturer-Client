import { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [aLoading, setaLoading] = useState(true);

  useEffect(() => {
    const email = user?.email;

    if (email) {
      fetch(`http://localhost:5000/admin?email=${email}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data?.isAdmin) {
            setAdmin(data?.isAdmin);
            setaLoading(false);
          }
        });
    }
  }, [user, admin]);

  return [admin, aLoading];
};

export default useAdmin;
