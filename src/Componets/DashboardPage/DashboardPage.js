import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../CustomHooks/useAdmin";
import auth from "../../firebase.init";

const DashboardPage = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  return (
    <div className="drawer drawer-mobile">
      <input id="dashbar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content lg:px-10 px-2 lg:py-24 py-16">
        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
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
              <li>
                <NavLink className="mt-5" to="myorder">
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="addreview">Add a review</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink className="mt-3" to="myprofile">
              My Profile
            </NavLink>
          </li>

          {admin && (
            <>
              <li>
                <NavLink to="manageAllOrders">Manage All Tools</NavLink>
              </li>
              <li>
                <NavLink to="addtool">Add A Tool</NavLink>
              </li>
              <li>
                <NavLink to="makeadmin">Make Admin</NavLink>
              </li>
              <li>
                <NavLink to="managetool">Manage Tools</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
