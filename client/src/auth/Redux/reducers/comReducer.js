import { combineReducers } from "redux";
import authReducer from "./authReducer";
import PetReducer from "./PetReducer";
const rootReducer = combineReducers({ authReducer, PetReducer });
export default rootReducer;
