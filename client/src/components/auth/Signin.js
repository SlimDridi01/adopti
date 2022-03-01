import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../auth/Redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SignIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ToggleError, setToggleError] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const errors = useSelector((state) => state.authReducer.errors);

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="my-16 border-2 border-neutral-900 bg-carte w-5/6 justify-center items-center drop-shadow-2xl flex flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-16">
          <h1 className="text-2xl lg:text-4xl font-semibold title-grey text-center">
            Welcome to ADOPTI
          </h1>
          <p className="para-grey text-xl font-semibold py-8 text-center">
            Welcome back! You can log to your account.
          </p>
          <form
            action=""
            className="flex flex-col lg:w-4/5 w-full"
            autoComplete="off"
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              type="Email"
              name="email"
              className="py-2 px-1  my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Email"
            />
            <small className={ToggleError && errors ? "text-red-500" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "Email") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              type="Password"
              name="password"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              placeholder="Password"
            />
            <small className={ToggleError && errors ? "text-red-500" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "Password") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(login({ Email, Password }, Navigate));
                setToggleError(true);
              }}
              className=" cursor-pointer  mx-8 my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-gray-700"
            >
              Sign In
            </button>
            <Link to="/SignUp" className="text-blue-500 text-center">
              SIGN UP NOW !!
            </Link>
          </form>
        </div>
        <div className="flex justify-center items-center p-4 sm:w-1/2">
          <img src="./images/cat.png" alt="" className="" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
