import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent, Logout } from "../../auth/Redux/actions/authActions";
import { NavLink, Link } from "react-router-dom";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getCurrent());
    }
  }, [token, dispatch]);
  const [navbar, setnavbar] = useState(false);
  let drawerClasses = ["side-drawer"];

  if (navbar) {
    drawerClasses = ["side-drawer", "open"];
  }

  return (
    <nav className="flex flex-col fixed w-screen z-10 ">
      <div
        className=" flex lg:flex-row flex-col lg:bg-stone-800
 drop-shadow-md  lg:h-auto h-10 text-white"
      >
        <div
          className="flex w-full bg-stone-800
 drop-shadow-md "
        >
          <h1 className="font-Dynalight text-4xl w-full text-left py-5 lg:mx-24 mx-10">
            {" "}
            <Link to="/Home" className="font-bold   ">
              ADOPTI
            </Link>
          </h1>

          <img
            src="images/humberger.svg"
            onClick={() => {
              setnavbar(!navbar);
            }}
            className="  w-9 h-9 mr-16 my-5 cursor-pointer block lg:hidden"
            alt=""
          />
        </div>

        <ul
          className={`flex lg:flex-row flex-col w-full bg-stone-800
 lg:drop-shadow-none  drop-shadow-md    justify-end mr-48 lg:items-center items-start   cursor-pointer ${drawerClasses.join(
   " "
 )}`}
        >
          <li
            className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500  "
          >
            {" "}
            <NavLink
              to="/Home"
              className="font-bold   "
              exact="true"
              activeclassname="active"
            >
              Home
            </NavLink>
          </li>
          <li
            className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500 "
          >
            {" "}
            <NavLink
              to="/Browse"
              className="font-bold  "
              exact="true"
              activeclassname="active"
            >
              Browse
            </NavLink>
          </li>
          {token ? (
            <>
              <li
                className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500 "
              >
                {" "}
                <NavLink
                  to="/Profile"
                  className="font-bold  "
                  exact="true"
                  activeclassname="active"
                >
                  {user && user.Name}
                </NavLink>
              </li>
              <li
                className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500 "
              >
                {" "}
                <NavLink
                  to="/Add"
                  className="font-bold  "
                  exact="true"
                  activeclassname="active"
                >
                  AddPet
                </NavLink>
              </li>
              <li
                className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500 "
              >
                <NavLink
                  to="/Home"
                  className="font-bold  "
                  exact="true"
                  onClick={() => dispatch(Logout())}
                  activeclassname="active"
                >
                  LogOut
                </NavLink>
              </li>
            </>
          ) : (
            //           // IF THERE IS NOT A TOKEN SHOW ME THIS
            <li
              className="md:m-5 pl-9 md:py-0 py-4 w-full md:hover:bg-stone-800
 hover:bg-stone-500 "
            >
              <NavLink
                to="/SignIn"
                className="font-bold  "
                exact="true"
                activeclassname="active"
              >
                LogIn
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
