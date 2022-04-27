import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { checkIsUserAdmin } from "../redux/authentication/actions";
import { db } from "../firebaseConfig";
import NotAuthorized from "./NotAuthorized";
import AdminCollegeCard from "../components/AdminCollegeCard";

const fontStyle = {
	fontSize: "32px",
	fontWeight: "bold",
};

const rowStyle = { marginBottom: "20px" };

export default function AdminScreen() {
	const currentUser = useSelector((state) => state.authReducers);
	const [totalEnrollees, setTotalEnrollees] = useState(0);
	const [programs, setPrograms] = useState([]);
	const dispatch = useDispatch();

	const renderCollegeCard = () => {
		console.log(programs);
		return (
			<>
				<Row style={rowStyle}>
					<Col>
						<AdminCollegeCard
							title="College of Computer Studies"
							programs={[programs[13], programs[12], programs[10]]}
						/>
					</Col>
					<Col>
						<AdminCollegeCard
							title="College of Engineering"
							programs={[programs[4], programs[8], programs[9]]}
						/>
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<AdminCollegeCard
							title="College of Education"
							programs={[programs[0], programs[6], programs[7]]}
						/>
					</Col>
					<Col>
						<AdminCollegeCard title="College of Criminology" programs={[programs[3]]} />
					</Col>
				</Row>
				<Row style={rowStyle}>
					<Col>
						<AdminCollegeCard title="College of Nursing" programs={[programs[1]]} />
					</Col>
					<Col>
						<AdminCollegeCard
							title="College of Medicine"
							programs={[programs[2], programs[5], programs[11]]}
						/>
					</Col>
				</Row>
			</>
		);
	};

	const renderAdminPage = () => {
		return currentUser.isAdmin ? (
			<>
				<Container>
					<h1 style={{ fontWeight: "bold", fontSize: "48px", textAlign: "center" }}>
						Admin
					</h1>
				</Container>
				<Container>
					<Row>
						<Col style={fontStyle}>Total Enrollees: {totalEnrollees}</Col>
						<Col style={fontStyle}>Total Colleges: 6</Col>
						<Col style={fontStyle}>Total Programs: {programs.length}</Col>
					</Row>
				</Container>
				<Container>{renderCollegeCard()}</Container>
			</>
		) : (
			<NotAuthorized />
		);
	};

	useEffect(() => {
		dispatch(checkIsUserAdmin(currentUser.uid));
		const getTotalEnrolleesAndPrograms = () => {
			const myQuery = query(collection(db, "programs"));
			onSnapshot(myQuery, (querySnapshot) => {
				const data = querySnapshot.docs;
				let tempTotal = 0;
				setPrograms(data.map((doc) => doc.data()));
				data.forEach((doc) => {
					tempTotal += doc.data().enrollees;
				});
				setTotalEnrollees(tempTotal);
			});
		};
		getTotalEnrolleesAndPrograms();
	}, [dispatch, currentUser.uid, setPrograms]);
	return <Container>{renderAdminPage()}</Container>;
}
