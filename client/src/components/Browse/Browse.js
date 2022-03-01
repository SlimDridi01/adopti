import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets } from "../../auth/Redux/actions/PetActions";
import PetCard from "../Petcard/Petcard";

function Browse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const Pets = useSelector((state) => state.PetReducer.Pets);
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pt-36">
      {Pets &&
        Pets.map((Pets) => <PetCard Pets={Pets} key={Pets._id}></PetCard>)}
    </div>
  );
}

export default Browse;
