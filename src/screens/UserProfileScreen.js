import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Button, Card, Container, Dropdown, SplitButton, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { db } from "../firebaseConfig";

export default function UserProfileScreen() {
	const currentUser = useSelector((state) => state.authReducers);
	const enrollmentData = useSelector((state) => state.enrollmentReducers);
	const [coursePicked, setCoursePicked] = React.useState(null);
	const [myCourses, setMyCourses] = React.useState([]);
	const [courses, setCourses] = React.useState([]);

	const requestToAddCourse = async () => {
		let updatedEnrollee = [];
		const courseRef = doc(db, "courses", coursePicked.id);
		const courseData = await getDoc(courseRef);
		updatedEnrollee = courseData.data().enrolleesInfo;
		updatedEnrollee.push({
			uid: currentUser.uid,
			email: currentUser.email,
			status: "pending",
			fullname: currentUser.username,
		});

		updateDoc(courseRef, {
			enrolleesInfo: updatedEnrollee,
		});
	};

	const renderStatus = (status) => {
		return status === "accepted" ? (
			<Button variant="success" disabled>
				{status}
			</Button>
		) : (
			<Button variant="warning" disabled>
				{status}
			</Button>
		);
	};

	const renderCourses = () => {
		return (
			<Container>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Course Code</th>
							<th>Course Description</th>
							<th>Course unit(s)</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{myCourses.map((course, index) => {
							return (
								<tr key={course.id}>
									<td>{index + 1}</td>
									<td>{course.courseCode}</td>
									<td>{course.description}</td>
									<td>{course.units}</td>
									<td>{renderStatus(course.status)}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Container>
		);
	};

	const onDropDownClicked = (course) => {
		setCoursePicked(course);
	};

	const renderDropDown = () => {
		return (
			<SplitButton variant="secondary" title={"Select Course"}>
				<div style={{ height: "150px", overflowY: "auto" }}>
					{courses.map((course) => {
						return (
							<div key={course.id}>
								<Dropdown.Item
									onClick={() => {
										onDropDownClicked(course);
									}}
								>
									<p style={{ fontSize: "1rem" }}>
										{course.description} ({course.courseCode}) {course.units}{" "}
										unit(s)
									</p>
								</Dropdown.Item>
								<hr />
							</div>
						);
					})}
				</div>
			</SplitButton>
		);
	};

	useEffect(() => {
		const getCourses = () => {
			let tempCourses = [];
			const myQuery = query(collection(db, "courses"));
			onSnapshot(myQuery, (querySnapshot) => {
				const data = querySnapshot.docs;
				tempCourses = data.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				setCourses(
					data.map((doc) => {
						return { id: doc.id, ...doc.data() };
					})
				);
				let myTempCourses = [];
				tempCourses.forEach((course) => {
					course.enrolleesInfo.forEach((enrollee) => {
						if (enrollee.uid === currentUser.uid)
							myTempCourses.push({ ...course, status: enrollee.status });
					});
				});
				setMyCourses(myTempCourses);
				myTempCourses = [];
			});
		};

		getCourses();
	}, [currentUser.uid]);

	return currentUser.isLoggedin ? (
		<Container>
			<h1>{currentUser?.username}</h1>
			<Table>
				<thead>
					<tr>
						<th>User ID</th>
						<th>Username</th>
						<th>Program</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{currentUser?.uid}</td>
						<td>{currentUser?.email}</td>
						<td>
							{enrollmentData?.programEnrolled?.programName}(
							{enrollmentData?.programEnrolled?.programAcronym})
						</td>
					</tr>
				</tbody>
			</Table>
			<br />
			<hr />
			<Card
				style={{
					padding: "1.5rem",
					marginBottom: "1rem",
					borderRadius: "25px",
					border: "solid #000",
				}}
			>
				<Card.Title>My Courses</Card.Title>
				<hr />
				<Container>
					<h4 style={{ textAlign: "center" }}>ADD COURSE</h4>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Course Code</th>
								<th>Course Description</th>
								<th>Course Unit(s)</th>
								<th>Select</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{coursePicked?.courseCode}</td>
								<td>{coursePicked?.description}</td>
								<td>{coursePicked?.units}</td>
								<td>{renderDropDown()}</td>
								<td>
									<Button
										style={{ borderRadius: "25px" }}
										onClick={requestToAddCourse}
									>
										Request Add
									</Button>
								</td>
							</tr>
						</tbody>
					</Table>
				</Container>
				<hr />
				<h3>Requested or Added Courses</h3>
				<br />
				{renderCourses()}
			</Card>
		</Container>
	) : (
		<h1 style={{}}>Signin First</h1>
	);
}
