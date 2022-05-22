import { Route, Routes } from "react-router-dom";
import HomePage from "./Componets/HomePage/HomePage";
import Navbar from "./Componets/Navbar/Navbar";
import LogIn from "./UsersRegistration/Login";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;
