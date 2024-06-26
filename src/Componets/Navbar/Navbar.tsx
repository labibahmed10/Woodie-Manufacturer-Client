import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Spinner from "../../Spinner/Spinner";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dashbar = location.pathname.includes("/dashboard");

  if (loading) {
    return <Spinner />;
  }

  return (
    <nav className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="w-full navbar md:px-20 pt-2 bg-neutral">
          {/* dashboard logo */}
          {dashbar && (
            <label htmlFor="dashbar" className="lg:hidden drawer-button">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          )}

          {/* brand logo */}
          <div onClick={() => navigate("/home")} className="flex-1 px-2 mx-2">
            <img className="w-16" src="https://i.postimg.cc/JhfM4jWF/logo.png" alt="" />
            <span className="md:text-2xl text-xl ml-1 font-bold">Wood Manufacturer</span>
          </div>

          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>

          <div className="flex-none hidden lg:block ">
            <ul className="menu menu-horizontal space-x-4">
              {/* <!-- Navbar menu content here --> */}
              <li>
                <NavLink to="/home" className="rounded-xl font-semibold">
                  Home
                </NavLink>
              </li>

              <li>
                {user && (
                  <NavLink to="/dashboard/myprofile" className="rounded-xl font-semibold">
                    Dashboard
                  </NavLink>
                )}
              </li>

              <li>
                {user ? (
                  <button
                    onClick={() => {
                      signOut(auth);
                      localStorage.removeItem("accessToken");
                    }}
                    className="rounded-xl font-semibold"
                  >
                    Log out
                  </button>
                ) : (
                  <NavLink to="/login" className="rounded-xl font-semibold">
                    Login
                  </NavLink>
                )}
              </li>

              <li>
                {user && (
                  <p onClick={() => navigate("/dashboard/myprofile")} className="active font-semibold">
                    {user?.displayName}
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* <!-- Page content here --> */}
        <Outlet></Outlet>
        {children}
        {/*  */}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 space-y-3">
          {/* <!-- Sidebar content here --> */}
          <li>
            <NavLink to="/home" className="rounded-xl font-semibold">
              Home
            </NavLink>
          </li>

          <li>
            {user && (
              <NavLink to="/dashboard/myorder" className="rounded-xl font-semibold">
                Dashboard
              </NavLink>
            )}
          </li>

          <li>
            {user ? (
              <button
                onClick={() => {
                  signOut(auth);
                  localStorage.removeItem("accessToken");
                }}
                className="rounded-xl font-semibold"
              >
                Log out
              </button>
            ) : (
              <NavLink to="/login" className="rounded-xl font-semibold">
                Login
              </NavLink>
            )}
          </li>

          <li>
            {user && (
              <p onClick={() => navigate("/dashboard/myprofile")} className="active font-semibold">
                {user?.displayName}
              </p>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
