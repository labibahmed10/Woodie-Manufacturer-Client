import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../CustomHooks/useAdmin";

const DashboardPage = () => {
  const [admin] = useAdmin();

  return (
    <div className="drawer drawer-mobile">
      <input id="dashbar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content lg:px-10 px-2 lg:mt-20 mt-10">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        <label htmlFor="dashbar" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side overflow-y-hidden">
        <label htmlFor="dashbar" className="drawer-overlay"></label>
        <ul className="menu p-4 space-y-2 lg:w-80 w-64  text-base-content bg-neutral relative">
          {/* <!-- Sidebar content here --> */}
          {/* this is used to close the sidebar */}
          <label htmlFor="dashbar" className="btn btn-sm btn-circle absolute right-2 top-2 lg:hidden">
            ✕
          </label>

          {!admin && (
            <>
              <li className="pt-5">
                <NavLink to="myorder">My Orders</NavLink>
              </li>
              <li>
                <NavLink to="addreview">Add a review</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink to="myprofile">My Profile</NavLink>
          </li>

          {admin && (
            <>
              <li>
                <NavLink to="manageorder">Manage All Orders</NavLink>
              </li>
              <li>
                <NavLink to="addtool">Add A Tool</NavLink>
              </li>
              <li>
                <NavLink to="makeadmin">Make Admin</NavLink>
              </li>
              <li>
                <NavLink to="managetool">Manage Products</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
