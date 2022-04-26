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
	CLEAR_AUTH_ERROR,
	UPDATE_USER_PROFILE_REQUEST,
	UPDATE_USER_PROFILE_FAILED,
	UPDATE_USER_PROFILE_SUCCESS,
} from "../../constants";

import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { app } from "../../../firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const clearAuthError = () => {
	return { type: CLEAR_AUTH_ERROR };
};

export const loginWithGoogle = () => {
	return (dispatch) => {
		dispatch({ type: USER_LOGIN_REQUEST });

		signInWithPopup(auth, provider)
			.then((result) => {
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
				const user = result.user;
				dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
			})
			.catch((error) => {
				dispatch({ USER_LOGIN_FAILED, payload: { error: error } });
			});
	};
};

export const loginWithEmailAndPassword = (email, password) => {
	return (dispatch) => {
		dispatch({ type: USER_LOGIN_REQUEST });

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				dispatch({
					type: USER_LOGIN_FAILED,
					payload: { error: { errorCode, errorMessage } },
				});
			});
	};
};

export const signupWithEmailAndPassword = (email, password, firstname, lastname) => {
	return (dispatch) => {
		dispatch({ type: USER_SIGNUP_REQUEST });

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				dispatch({ type: USER_SIGNUP_SUCCESS, payload: user });

				dispatch(updateUserProfile(firstname, lastname));
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				dispatch({
					type: USER_SIGNUP_FAILED,
					payload: { error: { errorCode, errorMessage } },
				});
			});
	};
};

export const updateUserProfile = (firstname, lastname) => {
	return (dispatch) => {
		dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

		updateProfile(auth.currentUser, {
			displayName: `${firstname} ${lastname}`,
			// photoURL: "https://example.com/jane-q-user/profile.jpg"
		})
			.then(() => {
				dispatch({ type: UPDATE_USER_PROFILE_SUCCESS });
			})
			.catch((error) => {
				dispatch({ type: UPDATE_USER_PROFILE_FAILED, payload: { error } });
			});
	};
};

export const getCurrentUser = () => {
	return (dispatch) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const currentUser = user;
				dispatch({ type: GET_CURRENT_USER, payload: { user: currentUser } });
				// ...
			} else {
				// User is signed out
				dispatch({ type: GET_CURRENT_USER, payload: { user: null } });
			}
		});
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch({ type: USER_LOGOUT_REQUEST });

		signOut(auth)
			.then(() => {
				dispatch({ type: USER_LOGOUT_SUCCESS });
			})
			.catch((error) => {
				dispatch({ type: USER_LOGOUT_FAILED, payload: { error: error } });
			});
	};
};
