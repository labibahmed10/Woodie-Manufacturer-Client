import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <nav class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div class="w-full navbar md:px-20 pt-5 bg-neutral">
          {/* brand logo */}
          <div class="flex-1 px-2 mx-2">
            <img className="w-16" src={logo} alt="" />
            <span className="text-2xl font-bold">Woodie</span>
          </div>

          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div class="flex-none hidden lg:block ">
            <ul class="menu menu-horizontal space-x-4">
              {/* <!-- Navbar menu content here --> */}
              <li>
                <NavLink to="/home" className="rounded-xl font-semibold">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/purchase" className="rounded-xl font-semibold">
                  Purchase
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" className="rounded-xl font-semibold">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="admin" className="rounded-xl font-semibold">
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="login" className="rounded-xl font-semibold">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        {/*  */}
      </div>

      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-72 bg-base-100 space-y-3">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink to="/home" className="rounded-xl font-semibold">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchase" className="rounded-xl font-semibold">
              Purchase
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="rounded-xl font-semibold">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="admin" className="rounded-xl font-semibold">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="login" className="rounded-xl font-semibold">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
