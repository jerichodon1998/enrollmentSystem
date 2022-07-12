import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CollegeCard from "../components/CollegeCard";
import { computerStudiesPrograms } from "../dummyData/programs";

import Logo from "../images/ccis_logo.png";
import Accis from "../images/Accis.jpg";

import BSIS from "../images/computerStudies/BSIS.jpg";
import BSIT from "../images/computerStudies/BSIT.jpg";
import BSCS from "../images/computerStudies/BSCS.jpg";
import ComputerStudies from "../images/computerStudies/ComputerStudies.jpg";
import IT from "../images/computerStudies/IT.jpg";

const loremipsum =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

export default function HomeScreen() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container style={{ paddingTop: "75px", textAlign: "center" }}>
			<Container>
				<Row>
					<Col>
						<Card className="bg-dark text-white">
							<Card.Img src={Accis} alt="Card image" />
						</Card>
					</Col>
					<Col>
						<img src={Logo} alt="logo" />
					</Col>
				</Row>
			</Container>
			<hr />
			<Container style={{ paddingBottom: "75px" }}>
				<Row style={{ paddingTop: "20px" }}>
					<Col>
						<CollegeCard
							title="College of Computer Studies"
							text={loremipsum}
							programs={computerStudiesPrograms}
							link="/college/College of Computer Studies"
							images={{
								collegeImg1: IT,
								collegeImg2: ComputerStudies,
								BSIS,
								BSIT,
								BSCS,
							}}
						/>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
