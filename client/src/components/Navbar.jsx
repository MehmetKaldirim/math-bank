import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants/index";
import { Link } from "react-router-dom";
import { signoutSuccess } from "../redux/userSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleNavigation = (id) => {
    navigate(`/#${id}`);
  };

  const handleSignOut = () => {
    dispatch(signoutSuccess()); // Clear the user state
    navigate("/"); // Redirect to home page after sign out
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="mathbank" className="w-[124px] h-[32px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-white ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
            onClick={() => handleNavigation(nav.id)}
          >
            {nav.title}
          </li>
        ))}
        <li className="font-poppins font-normal cursor-pointer text-[16px] text-white ml-10">
          {currentUser && currentUser.isAdmin ? (
            <span onClick={handleSignOut}>Sign Out</span>
          ) : (
            <Link to="/admin">Admin</Link>
          )}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] 
                  ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => handleNavigation(nav.id)}
              >
                {nav.title}
              </li>
            ))}
            <li className="font-poppins font-medium cursor-pointer text-[16px] mt-4">
              {currentUser && currentUser.isAdmin ? (
                <span onClick={handleSignOut}>Sign Out</span>
              ) : (
                <Link to="/admin">Admin</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
