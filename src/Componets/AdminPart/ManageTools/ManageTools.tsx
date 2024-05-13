import React, { useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../../../Spinner/Spinner";
import UseDeleteModal from "./UseDeleteModal";

const ManageTools = () => {
   const [deleteTool, setDeleteTool] = useState([]);
   const {
      data: allTools,
      isLoading,
      refetch,
   } = useQuery("alltools", () =>
      fetch("https://woodie-manufature.onrender.com/allTools", {
         method: "GET",
         headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
         },
      }).then((res) => res.json()),
   );

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <section className="lg:py-0 py-16">
         <h1 className="text-center lg:text-4xl text-2xl font-bold py-5">
            Manage All Tools Here
         </h1>
         <div>
            {deleteTool && (
               <UseDeleteModal
                  refetch={refetch}
                  deleteTool={deleteTool}
                  setDeleteTool={setDeleteTool}
               ></UseDeleteModal>
            )}

            <div className="overflow-x-auto">
               <table className="table w-full">
                  {/* <!-- head --> */}
                  <thead>
                     <tr className="text-center">
                        <th className="bg-neutral"></th>
                        <th className="bg-neutral">Image</th>
                        <th className="bg-neutral">Tools Name</th>
                        <th className="bg-neutral">MOQ(piece)</th>
                        <th className="bg-neutral">Price Per Unit</th>
                        <th className="bg-neutral">Available</th>
                        <th className="bg-neutral">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allTools?.map((detail, i) => (
                        <tr key={detail._id} className="text-center">
                           <td className="bg-accent">{i + 1}</td>
                           <th className="bg-accent">
                              <img className="w-14" src={detail.image} alt="" />
                           </th>
                           <td className="bg-accent">{detail?.name}</td>
                           <td className="bg-accent">{detail?.moq}</td>
                           <td className="bg-accent">{detail?.pPerUnit}</td>
                           <td className="bg-accent">{detail?.avlQuan}</td>
                           <td className="bg-accent">
                              <label
                                 onClick={() => setDeleteTool(detail)}
                                 htmlFor="deleteOrder"
                                 className="btn btn-error btn-sm"
                              >
                                 Delete Tool
                              </label>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>
   );
};

export default ManageTools;
