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
	CHECK_USER_ADMIN,
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
import { app, db } from "../../../firebaseConfig";
import { collection, onSnapshot, query } from "firebase/firestore";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const clearAuthError = () => {
	return { type: CLEAR_AUTH_ERROR };
};

export const checkIsUserAdmin = (uid) => {
	return (dispatch) => {
		const myQuery = query(collection(db, "adminUsersUid"));
		onSnapshot(myQuery, (querySnapshot) => {
			const data = querySnapshot;
			const adminUsersArray = data.docs.map((doc) => {
				return doc.data();
			});
			// this is not the best way because it doesn't break after it finds the value
			for (let i = 0; i < adminUsersArray.length; i++) {
				const value = adminUsersArray[i];
				if (uid === value.adminUid) {
					dispatch({ type: CHECK_USER_ADMIN, payload: true });
					break;
				}
			}
			// adminUsersArray.forEach((value) => {
			// 	if (uid === value.adminUid) {
			// 		dispatch({ type: CHECK_USER_ADMIN, payload: true });
			// 	}
			// });
		});
	};
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
