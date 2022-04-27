import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function AdminCollegeCard({ title, programs }) {
	return (
		<Container>
			<Card style={{ minWidth: "85px", minHeight: "200px" }}>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Row>
						{programs.map((prog) => {
							if (prog !== undefined) {
								return (
									<Col key={prog.programAcronym}>
										<Card>
											<Card.Body>
												<h6>
													{prog.programName} ({prog.programAcronym})
												</h6>
												<hr />
												<h6>Enrollees: {prog.enrollees}</h6>
											</Card.Body>
										</Card>
									</Col>
								);
							}
							return null;
						})}
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}
