import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import EnrollForm from "../components/EnrollForm";
import { useDispatch, useSelector } from "react-redux";
import { enrollStudent } from "../redux/enrollment/actions";

export default function ProgramScreen() {
	const currentUser = useSelector((state) => state.authReducers);
	const enrollment = useSelector((state) => state.enrollmentReducers);
	const { state } = useLocation();
	const { text, programImg, program } = state;
	const dispatch = useDispatch();

	const onEnrollSubmit = (values) => {
		dispatch(enrollStudent(program, currentUser.uid, values));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container style={{ marginBottom: "155px" }}>
			<h1 style={{ fontWeight: "bold", textAlign: "center" }}>{program.programName}</h1>
			<Row>
				<Col>
					<Card style={{ maxWidth: "500px" }}>
						<Card.Img variant="top" src={programImg} style={{ maxHeight: "350px" }} />
						<Card.Body>
							<Card.Text>{text}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card>
						<Card.Body>
							{enrollment.isEnrolled ? (
								<h1>
									You are Already Enrolled on{" "}
									{enrollment.programEnrolled.programName}
								</h1>
							) : (
								<EnrollForm onEnrollSubmit={onEnrollSubmit} />
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
