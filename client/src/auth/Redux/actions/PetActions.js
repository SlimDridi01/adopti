import { DELETE_PET, GET_PETS, MY_PETS } from "../types/PetTypes";
import axios from "axios";

// getPets action


export const getPets = () => async (dispatch) => {
 
  try {
    const res = await axios.get("Pets/getPets");
    dispatch({ type: GET_PETS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
export const getPetsId = (id) => async (dispatch) => {
 
  try {
    const res = await axios.get(`Pets/getPets/${id}`);
   
    dispatch({ type: GET_PETS, payload: res.data }); 
    return res
  } catch (error) {
    console.log(error);
  }
};

// get myPets
export const myPets = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };
  try {
    const res = await axios.get("Pets/myPets", config);
    dispatch({ type: MY_PETS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// Add Pets
export const APets =({ Title, Description, Image }) =>
  async (dispatch) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        authorized: token,
      },
    };
    const petAdded = new FormData();
    petAdded.append("Title", Title);
    petAdded.append("Description", Description);
    petAdded.append("Image", Image);
    try {
      const res = await axios.post("Pets/addPet", petAdded, config);
      dispatch(getPets());
    } catch (error) {
      console.log(error);
    }
  };


//  Delete Pets
export const deletePets = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
    data: { id },
  };
  try {
    const res = await axios.delete(`Pets/deletePets`, config);
    dispatch({ type: DELETE_PET });
    dispatch(getPets());
    console.log("Pet is deleted" + res);
  } catch (error) {
    console.log(error);
  }
};
export const updatePet = (Data) => async (dispatch) => {
  console.log(Data)
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };
  const petUpadate = new FormData();

  petUpadate.append("id ", Data.id);
  petUpadate.append("Title", Data.Title);
  petUpadate.append("Description", Data.Description);
  petUpadate.append("Image", Data.Image);


  
  try {
    const res = await axios.put(`/Pets/updatePet/${Data.id}`,petUpadate, config)
    console.log("Pet Is Updated", res);
    dispatch(getPets());
  } catch (error) {
    console.log(error);
  }
};


