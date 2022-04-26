import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ProgramCard from "../components/ProgramCard";

export default function CollegeScreen() {
	const { state } = useLocation();
	const { images, text, link, programs, title } = state;
	const renderProgramCard = () => {
		return programs.map((prog) => {
			return (
				<Col key={prog.programAcronym}>
					<ProgramCard
						programURL={`${link}/${prog.programAcronym}`}
						program={prog}
						programImg={images[prog.programAcronym]}
						text={text}
					/>
				</Col>
			);
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container>
			<Container style={{ textAlign: "center" }}>
				<h1 style={{ fontWeight: "bold" }}>{title}</h1>
				<h4 style={{ fontWeight: "bold" }}>{text}</h4>
				<Row>
					<Col>
						<Card>
							<Card.Img
								src={images.collegeImg1}
								alt="Card image"
								style={{ maxHeight: "300px" }}
							/>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Img
								src={images.collegeImg2}
								alt="Card image"
								style={{ maxHeight: "300px" }}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
			<hr style={{ borderColor: "#000", border: "solid 2px" }} />
			<Container style={{ marginTop: "20px", marginBottom: "20px" }}>
				<Row>{renderProgramCard()}</Row>
			</Container>
		</Container>
	);
}
