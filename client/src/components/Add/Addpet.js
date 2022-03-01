import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { APets } from "../../auth/Redux/actions/PetActions";

function Addpet() {
  const dispatch = useDispatch();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState("");
  return (
    <div className="flex justify-center items-center pt-16">
      <div className="my-16 border-2 border-neutral-900 bg-carte w-5/6 justify-center items-center drop-shadow-2xl flex flex-col md:flex-row">
        <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-16">
          <h1 className="text-2xl lg:text-4xl font-semibold title-grey text-center">
            Welcome to ADOPTI
          </h1>
          <p className="para-grey text-xl font-semibold py-8 text-center">
            Welcome back!Add Your Pet
          </p>

          <form className="flex flex-col  lg:w-4/5 w-full">
            <input
              placeholder="Title"
              type="Text"
              onChange={(e) => setTitle(e.target.value)}
              value={Title}
              name="Title"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />

            <textarea
              placeholder="Description"
              type="Text"
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
              name="Description"
              className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
              autoComplete="off"
            />

            <input
              type="file"
              className="block w-full text-sm   text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
              aria-label="File browser example"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <Link to="/Browse">
              <button
                onClick={() => dispatch(APets({ Title, Description, Image }))}
                className=" w-full text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-gray-700"
              >
                Add Pet
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addpet;
