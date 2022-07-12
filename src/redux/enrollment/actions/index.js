import { db } from "../../../firebaseConfig";
import {
	collection,
	getDocs,
	query,
	onSnapshot,
	updateDoc,
	doc,
	Timestamp,
} from "firebase/firestore";

import {
	CLEAR_ENROLLMENT_DATA,
	STUDENT_ENROLLED_CHECK,
	STUDENT_ENROLLMENT_FAILED,
	STUDENT_ENROLLMENT_REQUEST,
	STUDENT_ENROLLMENT_SUCCESS,
} from "../../constants";

// doc.id is document.id
// doc.data() is document data

export const isStudentEnrolled = (uid) => {
	return (dispatch) => {
		const myQuery = query(collection(db, "programs"));
		onSnapshot(myQuery, (querySnapshot) => {
			const data = querySnapshot.docs;
			// forEach loop is not ideal for this scenario
			// this needs to break after the specific data is found
			for (let i = 0; i < data.length; i++) {
				let enrolleeUidMatch = false;
				const doc = data[i];
				const tempDoc = doc.data();
				const enrolleesInfo = tempDoc.enrolleesInfo || [];
				enrolleesInfo.forEach((enrollee) => {
					if (enrollee.uid === uid) {
						enrolleeUidMatch = true;
						const programSelectedInfo = {
							programUid: doc.id,
							programAcronym: tempDoc.programAcronym,
							programName: tempDoc.programName,
							status: enrollee.status,
						};
						dispatch({ type: STUDENT_ENROLLED_CHECK, payload: programSelectedInfo });
					}
				});
				if (enrolleeUidMatch) break;
			}
			// data.forEach((doc) => {
			// 	const tempDoc = doc.data();
			// 	const enrolleesInfo = tempDoc.enrolleesInfo || [];
			// 	enrolleesInfo.forEach((enrollee) => {
			// 		if (enrollee.uid === uid) {
			// 			const programSelectedInfo = {
			// 				programUid: doc.id,
			// 				programAcronym: tempDoc.programAcronym,
			// 				programName: tempDoc.programName,
			// 			};
			// 			dispatch({ type: STUDENT_ENROLLED_CHECK, payload: programSelectedInfo });
			// 		}
			// 	});
			// });
		});
	};
};

export const enrollStudent = (program, uid, formValues) => {
	return async (dispatch) => {
		dispatch({ type: STUDENT_ENROLLMENT_REQUEST });

		const myQuery = query(collection(db, "programs"));
		let programInfo;
		// Fetching the specific program in the database
		try {
			await getDocs(myQuery).then((data) => {
				const allData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				programInfo = allData.find((arrayData) => {
					return arrayData.programName === program.programName;
				});
			});
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			dispatch({
				type: STUDENT_ENROLLMENT_FAILED,
				payload: { error: { errorCode, errorMessage } },
			});
		}
		// Updating the specific program in the database
		const programDocRef = doc(db, "programs", programInfo.id);
		try {
			const newEnrollee = {
				uid: uid,
				...formValues,
				status: "pending",
				timeStamp: Timestamp.now(),
			};
			const updatedEnrollees = programInfo.enrolleesInfo || [];
			updatedEnrollees.push(newEnrollee);
			const tempProgramInfo = {
				programAcronym: programInfo.programAcronym,
				programName: programInfo.programName,
				enrollees: updatedEnrollees.length,
				enrolleesInfo: updatedEnrollees,
			};
			await updateDoc(programDocRef, {
				...tempProgramInfo,
			});

			dispatch({
				type: STUDENT_ENROLLMENT_SUCCESS,
				payload: { programUid: programInfo.id, ...tempProgramInfo },
			});
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			dispatch({
				type: STUDENT_ENROLLMENT_FAILED,
				payload: { error: { errorCode, errorMessage } },
			});
		}
	};
};

export const clearEnrollmentData = () => {
	return { type: CLEAR_ENROLLMENT_DATA };
};
