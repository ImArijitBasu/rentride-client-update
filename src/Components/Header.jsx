import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const Header = () => {
  const {user , signOutHandle} = useContext(AuthContext)
  const buttons = (
    <>
      <NavLink to={'/'} className="text-blue-900 lg:text-white border border-yellow-500 px-2 py-1 rounded-lg font-bold outline-none">
        Home
      </NavLink>
      <NavLink to={'/available-cars'} className="text-blue-900 lg:text-white border border-yellow-500 px-2 py-1 rounded-lg font-bold outline-none">
        Available Cars
      </NavLink>
      {user ? (
        <>
          {" "}
          <NavLink to={"/add-car"} className="text-blue-900 lg:text-white border border-yellow-500 px-2 py-1 rounded-lg font-bold outline-none">
            Add Car
          </NavLink>
          <NavLink to={"/my-cars"} className="text-blue-900 lg:text-white border border-yellow-500 px-2 py-1 rounded-lg font-bold outline-none">
            My Cars
          </NavLink>
          <NavLink to={"/my-bookings"} className="text-blue-900 lg:text-white border border-yellow-500 px-2 py-1 rounded-lg font-bold outline-none">
            My Booking
          </NavLink>{" "}
        </>
      ) : (
        ""
      )}
    </>
  );
  const handleLogout =()=>{
    signOutHandle()
  }
  return (
    <div className="bg-blue-900 text-white fixed top-0 z-10 w-full">
      <div className="navbar bg-transparent container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {buttons}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img
              src="/logo.png"
              alt=""
              width="50"
              className="bg-yellow-500 rounded-3xl"
            />
            <div className="uppercase">RentRide</div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{buttons}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <NavLink onClick={handleLogout} className="btn bg-yellow-500 border-blue-50 border-2 font-extrabold text-blue-900 md:text-xl text-sm">
              Log Out
            </NavLink>
          ) : (
            <NavLink to={'/login'} className="btn bg-yellow-500 border-blue-50 border-2 font-extrabold text-blue-900 md:text-xl text-sm">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
