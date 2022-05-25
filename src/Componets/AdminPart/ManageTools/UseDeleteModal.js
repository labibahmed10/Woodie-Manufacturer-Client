import React from "react";
import swal from "sweetalert";

const UseDeleteModal = ({ refetch, deleteTool, setDeleteTool }) => {
  const { name, _id } = deleteTool;

  const handleDeleteOrder = () => {
    fetch(`http://localhost:5000/deleteTool/${_id}`, {
      method: "DELETE",
      headers: {
        authorizaion: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount > 0) {
          swal("Congratulations", "The Tool Was Deleted From Database", "success");
          refetch();
          setDeleteTool(null);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="deleteOrder" className="modal-toggle" />
      <div className="modal text-secondary">
        <div className="modal-box relative">
          <label htmlFor="deleteOrder" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Do you want to Delete the Tool?</h3>
          <p className="py-2">Name : {name}</p>

          <div className="flex justify-end">
            <button onClick={handleDeleteOrder} className="btn btn-primary btn-sm">
              Yes,Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseDeleteModal;