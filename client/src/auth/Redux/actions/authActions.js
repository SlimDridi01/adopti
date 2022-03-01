import {
  FAIL,
  GET_CURRENT,
  LOGIN,
  REGISTER,
  LOGOUT,
  TOGGLE_TRUE,
  TOGGLE_FALSE,
  DELETE_USER,
  GET_USERS,
  ADMIN,
  ADMIN_DELETE_USER,
  LOADING,
} from "../types/authTypes";
import axios from "axios";

//create new user
export const register = (newuser, Navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/user/signUp", newuser);
    dispatch({ type: REGISTER, payload: res.data });
    Navigate("/Profile");
  } catch (error) {
    dispatch({ type: FAIL, payload: error.response.data });
  }
};
export default register;

//login with your informations
export const login = (user, Navigate) => async (dispatch) => {
  try {
    const res = await axios.post("/user/signIn", user);
    dispatch({ type: LOGIN, payload: res.data });
    Navigate("/Profile");
  } catch (error) {
    dispatch({ type: FAIL, payload: error.response.data });
  }
};
//get the current user
export const getCurrent = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };
  try {
    const res = await axios.get("/user/current", config);
    dispatch({ type: GET_CURRENT, payload: res.data });
    dispatch({ type: LOADING });
  } catch (error) {
    dispatch({ type: FAIL, payload: error.response.data });
    dispatch({ type: LOADING });
  }
};

//logout
export const Logout = () => {
  return { type: LOGOUT };
};

export const toggleTrue = () => {
  return { type: TOGGLE_TRUE };
};
export const toggleFalse = () => {
  return { TYPE: TOGGLE_FALSE };
};

//Edit user
export const updateUser = (updateinfo) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };
  try {
    const res = await axios.put(`/user/Edit`, updateinfo, config);
    console.log("work");
    dispatch(getCurrent());
    console.log(res);
  } catch (error) {
    dispatch({ type: FAIL, payload: error.response.data });
  }
};

//Delete user
export const deleteuser = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
    data: { id },
  };
  try {
    const res = await axios.delete(`/user/delete`, config);
    dispatch({ type: DELETE_USER });
  } catch (error) {
    dispatch({ type: FAIL, payload: error.response.data });
  }
};

// Admin
// become admin
export const BeAdmin = (Key, Navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };

  try {
    const res = await axios.post("user/Admin", Key, config);
    dispatch({ type: ADMIN, payload: res.data });
    dispatch(getCurrent());
    Navigate("/Manage");
  } catch (error) {
    console.log(error);
  }
};

//admin get users
export const Admingetuser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
  };
  try {
    const res = await axios.get("user/Admin/getusers", config);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//admin delete user
export const adminDeleteUser = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      authorized: token,
    },
    data: { id },
  };
  try {
    const res = await axios.delete("/user/delete", config);
    dispatch({ type: ADMIN_DELETE_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
