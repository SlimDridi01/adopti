import React, { useEffect } from "react";
import { deleteuser, getCurrent } from "../../auth/Redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PetCard from "../Petcard/Petcard";
import { myPets } from "../../auth/Redux/actions/PetActions";

function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrent());
    dispatch(myPets());
  }, [dispatch]);

  // get Pets informations
  const myPet = useSelector((state) => state.PetReducer.myPets);

  //get the user informations
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div className="pt-36">
      <div className="flex flex-col justify-center items-center">
        <div className="grid md:grid-cols-2 grid-cols-1 justify-items-center	  bg-white  p-10 w-full drop-shadow-md rounded-md">
          <div className="grid md:grid-cols-3 grid-cols-1 justify-items-center pt-5">
            <h1 className="py-2">
              {" "}
              <strong>Name: </strong> {user && user.Name}
            </h1>
            <p className="py-2">
              <strong>Email: </strong>
              {user && user.Email}
            </p>
            <p className="py-2">
              <strong>Phone: </strong>
              {user && user.Phone}
            </p>
          </div>

          <div className="flex">
            <Link to="/Edit">
              <button className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-green-500">
                Edit
              </button>
            </Link>
            <Link to="/Home">
              <button
                className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-red-500"
                onClick={() => dispatch(deleteuser({ id: user._id }))}
              >
                delete
              </button>
            </Link>
            <Link to="/Admin">
              <button className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-blue-600">
                Admin
              </button>
            </Link>
            <Link to="/Manage">
              <button className="  mx-1 px-3 text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-gray-700">
                Manage
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
        {myPet &&
          myPet.map((Pets) => <PetCard Pets={Pets} key={Pets._id}></PetCard>)}
      </div>
    </div>
  );
}

export default Profile;
