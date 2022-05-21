import { Route, Routes } from "react-router-dom";
import Navbar from "./Componets/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      {/* <Routes>
        <Route path="/navbar" element={<Navbar></Navbar>}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
