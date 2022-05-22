import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content lg:px-10 px-2 lg:mt-20 mt-10">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div class="drawer-side ">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 space-y-2 lg:w-80 w-64  text-base-content bg-neutral">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink to="myorder">My Orders</NavLink>
          </li>
          <li>
            <NavLink to="addreview">Add a review</NavLink>
          </li>
          <li>
            <NavLink to="myprofile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="manageorder">Manage All Orders</NavLink>
          </li>
          <li>
            <NavLink to="addproduct">Add A Product</NavLink>
          </li>
          <li>
            <NavLink to="makeadmin">Make Admin</NavLink>
          </li>
          <li>
            <NavLink to="manageproduct">Manage Products</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
