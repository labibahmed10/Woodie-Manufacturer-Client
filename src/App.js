import { Route, Routes } from "react-router-dom";
import HomePage from "./Componets/HomePage/HomePage";
import Navbar from "./Componets/Navbar/Navbar";
import PurchasePage from "./Componets/PurchasePage/PurchasePage";
import RequiredAuth from "./RequireAuth/RequireAuth";
import LogIn from "./UsersRegistration/Login";
import SignUp from "./UsersRegistration/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./Componets/DashboardPage/DashboardPage";
import MyOrders from "./Componets/DashboardPage/MyOrders/MyOrders";
import AddReview from "./Componets/DashboardPage/AddReview/AddReview";
import MyProfile from "./Componets/DashboardPage/MyProfile/MyProfile";
import PaymentPage from "./Componets/DashboardPage/MyOrders/PaymentPage";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/login" element={<LogIn></LogIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>

          <Route
            path="/purchase/:id"
            element={
              <RequiredAuth>
                <PurchasePage></PurchasePage>
              </RequiredAuth>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <RequiredAuth>
                <DashboardPage></DashboardPage>
              </RequiredAuth>
            }
          >
            <Route path="myorder" element={<MyOrders></MyOrders>}></Route>
            <Route path="addreview" element={<AddReview></AddReview>}></Route>
            <Route path="myprofile" element={<MyProfile></MyProfile>}></Route>
            <Route path="payment/:id" element={<PaymentPage></PaymentPage>}></Route>
          </Route>
        </Routes>
        <ToastContainer theme="dark"></ToastContainer>
      </Navbar>
    </div>
  );
}

export default App;
