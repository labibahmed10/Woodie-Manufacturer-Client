import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <RingLoader speedMultiplier={1.1} color="#C28D51"></RingLoader>
    </div>
  );
};

export default Spinner;
