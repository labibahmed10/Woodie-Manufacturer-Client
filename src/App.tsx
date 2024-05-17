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
import ManageToolsPayment from "./Componets/AdminPart/ManageToolsPayment/ManageToolsPayment";
import MakeAdmin from "./Componets/AdminPart/MakeAdmin/MakeAdmin";
import ManageTools from "./Componets/AdminPart/ManageTools/ManageTools";
import AddATool from "./Componets/AdminPart/AddATool/AddATool";
import RequireAdmin from "./RequireAdmin/RequireAdmin";
import NotFoundPage from "./Componets/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>

          <Route
            path="/purchase/:id"
            element={
              <RequiredAuth>
                <PurchasePage />
              </RequiredAuth>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <RequiredAuth>
                <DashboardPage />
              </RequiredAuth>
            }
          >
            <Route path="myorder" element={<MyOrders />}></Route>
            <Route path="payment/:id" element={<PaymentPage />}></Route>
            <Route path="addreview" element={<AddReview />}></Route>
            <Route path="myprofile" element={<MyProfile />}></Route>

            <Route
              path="manageAllOrders"
              element={
                <RequireAdmin>
                  <ManageToolsPayment />
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="makeadmin"
              element={
                <RequireAdmin>
                  <MakeAdmin />
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="addtool"
              element={
                <RequireAdmin>
                  <AddATool />
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="managetool"
              element={
                <RequireAdmin>
                  <ManageTools />
                </RequireAdmin>
              }
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>

        <ToastContainer theme="dark" />
      </Navbar>
    </div>
  );
}

export default App;
