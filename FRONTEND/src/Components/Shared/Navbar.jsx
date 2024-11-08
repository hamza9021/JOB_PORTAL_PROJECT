import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const user = false;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {/* Profile Icon */}
          {!user ? (
            <div className="flex gap-3 items-center">
              <Link to="/login" className="button">
                Login
              </Link>
              <Link
                to="/signup"
                className="button bg-[#F83002] text-white px-4 py-2 rounded hover:bg-[#D22A00]"
              >
                Signup
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                alt="Profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    {/* Profile Image */}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                      alt="Profile"
                      className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                    <div>
                      {/* Name and Subtitle */}
                      <p className="font-semibold">Hamza Mern Stack</p>
                      <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>

                  {/* View Profile and Logout Links */}
                  <div className="mt-4 flex flex-col gap-2">
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-500 font-medium"
                    >
                      <CiUser className="w-6 h-6 mr-2" /> View Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-blue-500 font-medium"
                    >
                      <IoIosLogOut className="w-6 h-6 mr-2" /> Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
