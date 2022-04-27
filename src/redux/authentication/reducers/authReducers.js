import {
	USER_LOGOUT_REQUEST,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILED,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_FAILED,
	GET_CURRENT_USER,
	USER_SIGNUP_REQUEST,
	USER_SIGNUP_SUCCESS,
	USER_SIGNUP_FAILED,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_SUCCESS,
	UPDATE_USER_PROFILE_FAILED,
	CLEAR_AUTH_ERROR,
	CHECK_USER_ADMIN,
} from "../../constants";
const initialState = {
	error: null,
	username: "",
	uid: "",
	email: "",
	isAdmin: false,

	info: null,

	checkUserAdmin: false,

	isLoggedin: false,
	loginRequest: false,
	loginSuccess: false,
	logOutRequest: false,
	logOutSuccess: false,

	signupRequest: false,
	signupSuccess: false,
	signupFailed: false,

	updateUserProfileRequest: false,
	updateUserUserProfileSuccess: false,
	updateuserProfileFailed: false,
};

const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_USER_ADMIN:
			return {
				...state,
				isAdmin: action.payload,
			};
		case GET_CURRENT_USER:
			if (action.payload.user !== null)
				return {
					...state,
					email: action.payload.user.email,
					username: action.payload.user.displayName,
					uid: action.payload.user.uid,
					info: action.payload,
					isLoggedin: true,
				};
			return {
				...initialState,
			};
		case CLEAR_AUTH_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_LOGIN_REQUEST:
			return {
				...state,
				error: null,
				loginRequest: true,
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				email: action.payload.user.email,
				username: action.payload.user.username,
				uid: action.payload.user.uid,
				info: action.payload,
				error: null,
				loginRequest: false,
				loginSuccess: true,
				isLoggedin: true,
			};
		case USER_LOGIN_FAILED:
			return {
				...state,
				error: action.payload.error,
				loginRequest: false,
			};
		case USER_SIGNUP_REQUEST:
			return {
				...state,
				error: null,
				signupRequest: true,
			};
		case USER_SIGNUP_SUCCESS:
			return {
				...state,
				error: null,
				signupRequest: false,
				signupSuccess: true,
			};
		case USER_SIGNUP_FAILED:
			return {
				...state,
				signupFailed: true,
				signupRequest: false,
				error: action.payload.error,
			};
		case USER_LOGOUT_REQUEST:
			return {
				...state,
				error: null,
				logOutRequest: true,
			};
		case USER_LOGOUT_SUCCESS:
			return {
				isLoggedin: false,
				loginRequest: false,
				loginSuccess: false,
				logOutSuccess: true,
				logOutRequest: false,
				error: null,
				username: "",
				uid: "",
				email: "",
			};
		case USER_LOGOUT_FAILED:
			return {
				...state,
				logOutRequest: false,
				error: action.payload.error,
			};
		case UPDATE_USER_PROFILE_REQUEST:
			return {
				...state,
				error: null,
				updateUserProfileRequest: true,
				updateuserProfileFailed: false,
			};
		case UPDATE_USER_PROFILE_SUCCESS:
			return {
				...state,
				error: null,
				updateUserProfileRequest: false,
				updateUserUserProfileSuccess: true,
				updateuserProfileFailed: false,
			};
		case UPDATE_USER_PROFILE_FAILED:
			return {
				...state,
				updateUserProfileRequest: false,
				updateuserProfileFailed: true,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

export default authReducers;
