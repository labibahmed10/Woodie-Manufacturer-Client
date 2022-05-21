import { Route, Routes } from "react-router-dom";
import HomePage from "./Componets/HomePage/HomePage";
import Navbar from "./Componets/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
