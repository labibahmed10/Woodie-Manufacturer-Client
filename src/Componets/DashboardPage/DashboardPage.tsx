import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../CustomHooks/useAdmin";
import auth from "../../firebase.init";
import { User } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { IoReorderFourSharp, IoBagAddOutline } from "react-icons/io5";
import { MdRateReview, MdOutlineManageSearch } from "react-icons/md";
import { RiAdminLine, RiToolsFill } from "react-icons/ri";

const DashboardPage = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user as User);

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
                  <IoReorderFourSharp /> My Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="addreview">
                  <MdRateReview />
                  Add a review
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink className="mt-3" to="myprofile">
              <CgProfile size={24} /> My Profile
            </NavLink>
          </li>

          {admin && (
            <>
              <li>
                <NavLink to="manageAllOrders">
                  <MdOutlineManageSearch size={24} /> Manage Tools Payment
                </NavLink>
              </li>
              <li>
                <NavLink to="addtool">
                  <IoBagAddOutline size={24} />
                  Add Tool
                </NavLink>
              </li>
              <li>
                <NavLink to="makeadmin">
                  <RiAdminLine size={24} />
                  Make Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="managetool">
                  <RiToolsFill size={24} />
                  Manage Tools
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
