import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProgramCard({ programImg, text, programURL, program }) {
	const navigate = useNavigate();
	return (
		<Card style={{ width: "18rem", minHeight: "400px" }}>
			<Card.Img variant="top" src={programImg} style={{ maxHeight: "150px" }} />
			<Card.Body>
				<Card.Title>{program.programName}</Card.Title>
				<Card.Text>{text}</Card.Text>
				<Button
					variant="primary"
					onClick={() => {
						navigate(programURL, { state: { program, text, programImg } });
					}}
				>
					Visit Program
				</Button>
			</Card.Body>
		</Card>
	);
}
