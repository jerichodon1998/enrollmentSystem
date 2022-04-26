import {
	STUDENT_ENROLLED_CHECK,
	STUDENT_ENROLLMENT_FAILED,
	STUDENT_ENROLLMENT_REQUEST,
	STUDENT_ENROLLMENT_SUCCESS,
} from "../../constants";

const initialState = {
	isEnrolled: false,
	programEnrolled: null,

	enrollmentSuccess: false,
	enrollmentFailed: false,
	enrollmentRequest: false,
	enrollmentData: null,
	error: null,
};

const enrollmentReducers = (state = initialState, action) => {
	switch (action.type) {
		case STUDENT_ENROLLED_CHECK:
			return {
				...state,
				isEnrolled: true,
				programEnrolled: action.payload,
			};
		case STUDENT_ENROLLMENT_REQUEST:
			return {
				...state,
				error: null,
				enrollmentRequest: true,
				enrollmentFailed: false,
				enrollmentSuccess: false,
			};
		case STUDENT_ENROLLMENT_SUCCESS:
			return {
				...state,
				enrollmentRequest: false,
				enrollmentFailed: true,
				enrollmentData: action.payload,
				isEnrolled: true,
				programEnrolled: {
					programUid: action.payload.programUid,
					programAcronym: action.payload.programAcronym,
					programName: action.payload.programName,
				},
				error: null,
			};
		case STUDENT_ENROLLMENT_FAILED:
			return {
				...state,
				enrollmentRequest: false,
				enrollmentFailed: true,
				enrollmentSuccess: false,
				error: action.payload.error,
			};
		default:
			return state;
	}
};

export default enrollmentReducers;
