import { useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(true);

  return [admin];
};

export default useAdmin;
