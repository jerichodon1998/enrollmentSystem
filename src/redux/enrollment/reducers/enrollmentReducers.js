import {
	STUDENT_ENROLLED_CHECK,
	STUDENT_ENROLLMENT_FAILED,
	STUDENT_ENROLLMENT_REQUEST,
	STUDENT_ENROLLMENT_SUCCESS,
	CLEAR_ENROLLMENT_DATA,
} from "../../constants";

const initialState = {
	isEnrolled: false,
	status: null,
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
				status: action.payload.status,
				programEnrolled: action.payload,
			};
		case CLEAR_ENROLLMENT_DATA:
			return {
				...state,
				isEnrolled: false,
				status: null,
				programEnrolled: null,
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
