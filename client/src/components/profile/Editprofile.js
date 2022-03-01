import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../auth/Redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";

function Edit() {
  const dispatch = useDispatch();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ToggleError, setToggleError] = useState(false);
  const user = useSelector((state) => state.authReducer.user);
  const errors = useSelector((state) => state.authReducer.errors);
  const Navigate = useNavigate();

  return (
    <div className="flex justify-center items-center pt-16">
      <div className="my-16 border-2 border-neutral-900 bg-carte w-5/6 justify-center items-center drop-shadow-2xl flex flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-16">
          <h1 className="text-2xl lg:text-4xl font-semibold title-grey text-center">
            Welcome to ADOPTI
          </h1>
          <p className="para-grey text-xl font-semibold py-8 text-center">
            Update Your Account
          </p>
          <form className="flex flex-col  lg:w-4/5 w-full" autoComplete="off">
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={user ? user.Name : null}
              type="Name"
              name="name"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />

            <small className={ToggleError && errors ? "Error" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "Name") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>

            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={user ? user.Email : null}
              type="Email"
              name="email"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />

            <small className={ToggleError && errors ? "Error" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "Email") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>

            <input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
              type="Phone"
              name="Phone"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />
            <small className={ToggleError && errors ? "Error" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "Phone") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>

            <br />

            <input
              placeholder="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              value={OldPassword}
              type="Password"
              name="Oldpassword"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />

            <br />
            <small className={ToggleError && errors ? "Error" : ""}>
              {errors &&
                errors.map((el) => {
                  if (el.param === "OldPassword") {
                    return el.msg;
                  }
                  return null;
                })}
            </small>

            <div id="floating-label">
              <input
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={NewPassword}
                type="Password"
                name="NewPassword"
                className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
                autoComplete="off"
              />

              <br />
              <small className={ToggleError && errors ? "Error" : ""}>
                {errors &&
                  errors.map((el) => {
                    if (el.param === "NewPassword") {
                      return el.msg;
                    }
                    return null;
                  })}
              </small>
            </div>
            <Link to="/">
              <button
                type="submit"
                className=" w-full text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-gray-700"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    updateUser(
                      {
                        id: user._id,
                        Name,
                        Email,
                        Phone,
                        OldPassword,
                        NewPassword,
                      },
                      Navigate
                    )
                  );
                  setToggleError(false);
                }}
              >
                Edit
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
