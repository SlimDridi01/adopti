import {
  ADMIN,
  ADMIN_DELETE_USER,
  DELETE_USER,
  FAIL,
  GET_CURRENT,
  GET_USERS,
  LOADING,
  LOGIN,
  LOGOUT,
  REGISTER,
  TOGGLE_FALSE,
  TOGGLE_TRUE,
} from "../types/authTypes";

const initialState = {
  user: null,
  users: null,
  errors: null,
  auth: false,
  edit: false,
  deleted: null,
  loading: true,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER:
    case LOGIN:
      localStorage.setItem("token", payload.token);

      return { ...state, user: payload.user, auth: true, errors: null };

    case FAIL:
      return { ...state, errors: payload.errors, auth: false };
    case DELETE_USER:
      localStorage.removeItem("token");
      return { ...state, user: null, auth: false };
    case GET_CURRENT:
      return { ...state, user: payload, auth: true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, auth: false, user: null };
    default:
      return state;
    case TOGGLE_TRUE:
      return { ...state, edit: true };
    case TOGGLE_FALSE:
      return { ...state, edit: false };
    case GET_USERS:
      return { ...state, users: payload.users };
    case ADMIN:
      return { ...state, user: payload.user };
    case LOADING:
      return { ...state, loading: false };
    case ADMIN_DELETE_USER: {
      return { ...state, deleted: payload.deleted };
    }
  }
};

export default authReducer;
