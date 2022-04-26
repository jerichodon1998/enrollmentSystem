import { combineReducers } from "redux";
import authReducers from "./authentication/reducers/authReducers";
import enrollmentReducers from "./enrollment/reducers/enrollmentReducers";

const rootReducer = combineReducers({
	authReducers,
	enrollmentReducers,
});

export default rootReducer;
