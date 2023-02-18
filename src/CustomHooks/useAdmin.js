import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAdmin = (user) => {
   const [admin, setAdmin] = useState(false);
   const [aLoading, setaLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const email = user?.email;

      if (email) {
         fetch(`https://woodie-manufature.onrender.com/admin?email=${email}`, {
            method: "GET",
            headers: {
               authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
         })
            .then((res) => {
               // if (res.status === 401 || res.status === 403) {
               //   navigate("/home");
               // }
               return res.json();
            })
            .then((data) => {
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
