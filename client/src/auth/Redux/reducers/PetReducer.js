import { GET_PETS, MY_PETS, DELETE_PET } from "../types/PetTypes";

const initialState = {
  Pets: null,
  myPets: null,
  Pet: {},
};

const PetReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case GET_PETS:
      return { ...state, Pets: payload.getPets };
    case MY_PETS:
      return { ...state, myPets: payload.myPets };
    case DELETE_PET: {
      localStorage.removeItem("");
      return { ...state, Pets: null, myPets: null };
    }
    default:
      return state;
  }
};
export default PetReducer;
