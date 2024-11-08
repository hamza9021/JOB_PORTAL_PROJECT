import React from "react";
import { Navbar } from "../";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
        const [input, setInput] = useState({
          email: "",
          password: "",
          role: "",
        });
        const eventHandler = (e) => {
          console.log(e.target.name + " : " + e.target.value);
          setInput({ ...input, [e.target.name]: e.target.value });
        };
      
        const submitHandler = async (e) => {
          e.preventDefault();
          console.log(input);
        };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50" onSubmit={submitHandler}>
        <form
          action=""
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="font-bold text-2xl text-center mb-6">Login</h1>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="hriaz9803@gmail.com"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="email"
              value={input.email}
              onChange={eventHandler}
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="password"
              value={input.password}
              onChange={eventHandler}
            />
          </div>

          <div className="my-4 flex items-center">
            <input
              type="radio"
              id="student"
              name="role"
              className="cursor-pointer text-indigo-600"
              value="student"
              onChange={eventHandler}
            />
            <label
              htmlFor="student"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Student
            </label>

            <input
              type="radio"
              id="recruiter"
              name="role"
              className="ml-4 cursor-pointer text-indigo-600"
              value="recruiter"
              onChange={eventHandler}
            />
            <label
              htmlFor="recruiter"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Recruiter
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Signup
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Dont have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
