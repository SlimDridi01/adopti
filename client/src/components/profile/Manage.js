import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUser,
  Admingetuser,
} from "../../auth/Redux/actions/authActions";
import { getPetsId } from "../../auth/Redux/actions/PetActions";
import PetCard from "../Petcard/Petcard";
import { Link } from "react-router-dom";

function Manage() {
  const dispatch = useDispatch();
  const [IdUser, setIdUser] = useState();
  useEffect(() => {
    dispatch(Admingetuser());
    dispatch(getPetsId(IdUser));
  }, []);
  const users = useSelector((state) => state.authReducer.users);
  let Pets = useSelector((state) => state.PetReducer.Pets);

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-36">
        {Pets &&
          Pets.map((Pet) => <PetCard Pets={Pet} key={Pet._id}></PetCard>)}
      </div>
      <div className="flex justify-center items-center">
        {users &&
          users.map((user) => (
            <button
              Key={Math.floor(Math.random() * 10000)}
              onClick={(e) => {
                setIdUser(e.target.getAttribute("value"));
                dispatch(getPetsId(e.target.getAttribute("value")));
              }}
              value={user._id}
              className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-blue-500"
            >
              {user.Name}
            </button>
          ))}
      </div>
      <div className="flex justify-center items-center">
        <Link to="/">
          <button
            onClick={() => dispatch(adminDeleteUser({ id: IdUser }))}
            className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-red-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-red-800"
          >
            Delete this profile
          </button>
        </Link>
      </div>
    </>
  );
}

export default Manage;
