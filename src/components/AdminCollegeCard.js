import React from "react";
import { Button, Card, Col, Container } from "react-bootstrap";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Table from "react-bootstrap/Table";

const btnStyle = {
	borderRadius: "25px",
	fontWeight: "bold",
	color: "#fff",
};

export default function AdminCollegeCard({ title, programs }) {
	const acceptEnrollee = async (enrollee, prog) => {
		let enrollees = [];
		const enrolleeRef = doc(db, "programs", prog.id);
		const enrolleeData = await getDoc(enrolleeRef);
		enrollees = enrolleeData.data().enrolleesInfo;
		const updatedEnrollees = enrollees.map((enrolleeStudent) => {
			if (enrollee.uid === enrolleeStudent.uid) {
				return { ...enrolleeStudent, status: "accepted" };
			}
			return enrolleeStudent;
		});

		updateDoc(enrolleeRef, {
			enrolleesInfo: updatedEnrollees,
		});
	};

	const unenrollStudent = async (enrollee, prog) => {
		let enrollees = [];

		const coursesRef = collection(db, "courses");
		const coursesData = await getDocs(coursesRef);
		coursesData.forEach((course) => {
			enrollees = course.data().enrolleesInfo;
			const updatedEnrollees = enrollees.filter((enrolleeStudent) => {
				return enrollee.uid !== enrolleeStudent.uid;
			});
			const courseRef = doc(db, "courses", course.id);

			updateDoc(courseRef, {
				enrolleesInfo: updatedEnrollees,
			});
		});

		const enrolleeRef = doc(db, "programs", prog.id);
		const enrolleeData = await getDoc(enrolleeRef);
		enrollees = enrolleeData.data().enrolleesInfo;
		const updatedEnrollees = enrollees.filter((enrolleeStudent) => {
			return enrollee.uid !== enrolleeStudent.uid;
		});

		updateDoc(enrolleeRef, {
			enrolleesInfo: updatedEnrollees,
		});
	};

	// NOTE: need to unenroll on all courses if u unenroll a student
	const renderButton = (enrollee, prog) => {
		if (enrollee.status === "pending") {
			return (
				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<Button variant="warning" style={btnStyle} disabled>
						{enrollee.status}
					</Button>
					<Button
						variant="success"
						style={btnStyle}
						onClick={() => acceptEnrollee(enrollee, prog)}
					>
						accept
					</Button>
				</div>
			);
		}
		return (
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<Button variant="success" style={btnStyle} disabled>
					{enrollee.status}
				</Button>
				<Button
					variant="danger"
					style={btnStyle}
					onClick={() => unenrollStudent(enrollee, prog)}
				>
					unenroll
				</Button>
			</div>
		);
	};

	return (
		<Container>
			<Card>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					{programs.map((prog) => {
						if (prog !== undefined) {
							const enrolleesInfo = prog.enrolleesInfo;
							return (
								<Col key={prog.programAcronym}>
									<Card
										style={{ border: "solid .2rem #000", borderRadius: "25px" }}
									>
										<Card.Body>
											<h6>
												{prog.programName} ({prog.programAcronym})
											</h6>
											<hr />
											<h6>Enrollees: {prog.enrollees}</h6>
											<hr />
											<Table striped bordered hover>
												<thead>
													<tr>
														<th>#</th>
														<th>First Name</th>
														<th>Last Name</th>
														<th>Username</th>
														<th>Program</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{enrolleesInfo.map((enrollee, index) => {
														return (
															<tr key={index}>
																<td>{index + 1}</td>
																<td>{enrollee.firstname}</td>
																<td>{enrollee.lastname}</td>
																<td>{enrollee.email}</td>
																<td>{prog.programAcronym}</td>
																<td>
																	{renderButton(enrollee, prog)}
																</td>
															</tr>
														);
													})}
												</tbody>
											</Table>
										</Card.Body>
									</Card>
									<br />
								</Col>
							);
						}
						return null;
					})}
				</Card.Body>
			</Card>
		</Container>
	);
}
