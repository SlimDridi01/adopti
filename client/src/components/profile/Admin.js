import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeAdmin } from "../../auth/Redux/actions/authActions";
function Admin() {
  const dispatch = useDispatch();
  const [Key, setKey] = useState("");
  const Navigate = useNavigate();

  return (
    <div className="flex  sm:flex-row  flex-col justify-center items-center pt-56">
      <h1 className="font-bold px-2">Admin: </h1>
      <input
        placeholder="Key"
        onChange={(e) => setKey(e.target.value)}
        value={Key}
        type="Key"
        name="Key"
        className="py-2 px-1 my-2 rounded-sm drop-shadow-sm focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900"
        autoComplete="off"
      />
      <button
        className="  mx-3 w-32  text-center cursor-pointer  my-5 inline-block text-center bg-gray-600 border border-transparent rounded-md py-2  font-medium text-white hover:bg-gray-700"
        onClick={() => dispatch(BeAdmin({ Key }, Navigate))}
      >
        Admin
      </button>
    </div>
  );
}

export default Admin;
