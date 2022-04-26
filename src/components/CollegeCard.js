import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CustomCard({ title, text, images, link, programs }) {
	const navigate = useNavigate();
	return (
		<Card style={{ width: "18rem", minHeight: "400px" }}>
			<Card.Img variant="top" src={images.collegeImg1} />
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{text}</Card.Text>
				<Button
					variant="primary"
					onClick={() => {
						navigate(link, { state: { title, text, images, link, programs } });
					}}
				>
					Visit College
				</Button>
			</Card.Body>
		</Card>
	);
}
