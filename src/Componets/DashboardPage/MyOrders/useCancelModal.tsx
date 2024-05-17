const UseCancelModal = ({ cancelOrder, setCancelOrder, refetch }: any) => {
  const { toolName, _id, avlQuan, quantity } = cancelOrder;

  const handleCancelOrder = (id: any) => {
    const newQuantity = avlQuan + quantity;
    cancelOrder = { ...cancelOrder, avlQuan: newQuantity };
    const { prodID, avlQuan: availableQuantity } = cancelOrder;

    fetch(`http://localhost:5000/cancel-order/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data?.deletedCount > 0) {
          // refetch();
          setCancelOrder(null);
          // here i need the id of that specific tool to update its quantity
          fetch(`http://localhost:5000/all-tools/${prodID || _id}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ avlQuan: availableQuantity }),
          })
            .then((res) => res.json())
            .then(({ data }) => {
              if (data?.modifiedCount > 0) {
                refetch();
              }
            });
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="cancelorder" className="modal-toggle" />
      <div className="modal text-secondary">
        <div className="modal-box relative">
          <label htmlFor="cancelorder" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Are You Sure You Want To Cancel The Order For :-</h3>
          <p className="py-2">Name : {toolName}</p>
          <p>Quantity : {quantity}</p>
          <div className="flex justify-end">
            <button onClick={() => handleCancelOrder(_id)} className="btn btn-primary btn-sm">
              Yes,cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCancelModal;
