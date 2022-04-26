import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./auth/Login";

const linkStyle = {
	textDecoration: "none",
	color: "grey",
};

export default function Header() {
	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand>
					<Link to="/" style={{ ...linkStyle, fontSize: "32px", fontWeight: "bold" }}>
						Enrollment System
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav.Item className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
						<Link to="/dummy" style={linkStyle}>
							dummy
						</Link>
					</Nav.Item>

					<Container style={{ textAlign: "right" }}>
						<Login />
					</Container>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
