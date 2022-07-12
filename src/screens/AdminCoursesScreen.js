import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { db } from "../firebaseConfig";
import NotAuthorized from "./NotAuthorized";

export default function AdminCoursesScreen() {
	const currentUser = useSelector((state) => state.authReducers);
	const [courses, setCourses] = React.useState([]);

	useEffect(() => {
		const getCourses = () => {
			const myQuery = query(collection(db, "courses"));
			onSnapshot(myQuery, (querySnapshot) => {
				const data = querySnapshot.docs;
				setCourses(
					data.map((doc) => {
						return { id: doc.id, ...doc.data() };
					})
				);
			});
		};
		getCourses();
	}, []);

	const onSubjectEnroll = async (enrollee, course) => {
		let enrollees = [];
		const courseRef = doc(db, "courses", course.id);
		const enrolleeData = await getDoc(courseRef);
		enrollees = enrolleeData.data().enrolleesInfo;
		const updatedEnrollees = enrollees.map((enrolleeStudent) => {
			if (enrollee.uid === enrolleeStudent.uid) {
				return { ...enrolleeStudent, status: "accepted" };
			}
			return enrolleeStudent;
		});

		updateDoc(courseRef, {
			enrolleesInfo: updatedEnrollees,
		});
	};

	const onSubjectUnenroll = async (enrollee, course) => {
		let enrollees = [];
		const courseRef = doc(db, "courses", course.id);
		const enrolleeData = await getDoc(courseRef);
		enrollees = enrolleeData.data()?.enrolleesInfo;
		const updatedEnrollees = enrollees?.filter((enrolleeStudent) => {
			return enrollee.uid !== enrolleeStudent.uid;
		});

		updateDoc(courseRef, {
			enrolleesInfo: updatedEnrollees,
		});
	};

	const renderStatus = (enrollee, course) => {
		return enrollee.status === "accepted" ? (
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Button variant="success" disabled>
					{enrollee.status}
				</Button>
				<Button
					variant="danger"
					onClick={() => {
						onSubjectUnenroll(enrollee, course);
					}}
				>
					unenroll
				</Button>
			</div>
		) : (
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Button variant="warning" disabled>
					{enrollee.status}
				</Button>
				<Button
					variant="success"
					onClick={() => {
						onSubjectEnroll(enrollee, course);
					}}
				>
					accept
				</Button>
			</div>
		);
	};

	const mapCourses = () => {
		return (
			<Container>
				<Card>
					<Card.Body>
						{courses.map((course) => {
							if (course !== undefined) {
								const enrolleesInfo = course.enrolleesInfo;
								return (
									<Col
										key={course.id}
										style={{
											border: "solid #000",
											marginBottom: "1rem",
											padding: "1.5rem",
											borderRadius: "10px",
										}}
									>
										<Card
											style={{
												borderRadius: "10px",
											}}
										>
											<h3>
												{course.courseCode} ({course.description})
											</h3>
											<hr />
											<Card.Body>
												<Table striped bordered hover>
													<thead>
														<tr>
															<th>#</th>
															<th>ID</th>
															<th>Full Name</th>
															<th>Username</th>
															<th>Status</th>
														</tr>
													</thead>
													<tbody>
														{enrolleesInfo.map((enrollee, index) => {
															return (
																<tr key={enrollee.uid}>
																	<td>{index + 1}</td>
																	<td>{enrollee.uid}</td>
																	<td>{enrollee.fullname}</td>
																	<td>{enrollee.email}</td>
																	<td>
																		{renderStatus(
																			enrollee,
																			course
																		)}
																	</td>
																</tr>
															);
														})}
													</tbody>
												</Table>
											</Card.Body>
										</Card>
									</Col>
								);
							}
							return null;
						})}
					</Card.Body>
				</Card>
			</Container>
		);
	};

	const renderAdminCoursesPage = () => {
		return currentUser.isAdmin ? mapCourses() : <NotAuthorized />;
	};

	return <>{renderAdminCoursesPage()}</>;
}
