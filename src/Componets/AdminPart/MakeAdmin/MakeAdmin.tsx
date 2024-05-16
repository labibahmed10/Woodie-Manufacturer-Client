import { useMutation, useQuery, useQueryClient } from "react-query";
import swal from "sweetalert";
import Spinner from "../../../Spinner/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import useAdmin from "../../../CustomHooks/useAdmin";
import auth from "../../../firebase.init";
import { User } from "firebase/auth";
import { useEffect } from "react";

export interface IAllUsers {
  name: string;
  email: string;
  role?: string;
  education?: string;
  location?: string;
  phone?: string;
  profile?: string;
}

const MakeAdmin = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user as User);

  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const data = await fetch("http://localhost:5000/all-users", {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return data.json();
    },
  });

  const { mutate, data, isSuccess, isError } = useMutation({
    mutationKey: ["all-users"],
    mutationFn: async (email: string) => {
      const data = await fetch(`http://localhost:5000/remove-user?email=${email}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return await data.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },
  });

  useEffect(() => {
    if (data && !data?.success) {
      swal("Error!", data?.errorMessage, "error");
    }
  }, [data?.success]);

  if (isLoading) {
    return <Spinner />;
  }

  const makeAdmin = async (email: string) => {
    const updated = await fetch(`http://localhost:5000/make-admin/?email=${email}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await updated.json();
    if (data?.data?.modifiedCount) {
      refetch();
      swal("Congrats!", "This user was made as an 'Admin'", "success");
    }
  };

  const removeAdmin = async (email: string) => {
    const updated = await fetch(`http://localhost:5000/remove-admin/?email=${email}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const data = await updated.json();
    if (data?.data?.modifiedCount) {
      refetch();
      swal("Congrats!", data?.message, "success");
    }
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
            {users?.data?.map((user: IAllUsers, i: number) => (
              <tr key={i} className="hover text-center">
                <th className="bg-accent">{i + 1}</th>
                <td className="bg-accent">{user.name}</td>
                <td className="bg-accent">{user.email}</td>
                <td className="bg-accent">
                  {user?.role !== "admin" ? (
                    <button
                      onClick={() => makeAdmin(user.email)}
                      className="btn btn-sm btn-primary bg-green-600 hover:bg-green-700 border-0 text-white"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => removeAdmin(user.email)}
                      className="btn btn-sm btn-primary bg-amber-700 hover:bg-amber-800 border-0 text-white"
                    >
                      Remove admin
                    </button>
                  )}
                </td>
                <td className="bg-accent">
                  <button onClick={() => mutate(user.email)} className="btn btn-sm">
                    Delete User
                  </button>
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
