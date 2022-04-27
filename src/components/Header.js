import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIsUserAdmin } from "../redux/authentication/actions";
import Login from "./auth/Login";

const linkStyle = {
	textDecoration: "none",
	color: "grey",
};

export default function Header() {
	const currentUser = useSelector((state) => state.authReducers);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkIsUserAdmin(currentUser.uid));
	}, [dispatch, currentUser.uid]);

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
					{currentUser.isAdmin ? (
						<Nav.Item className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
							<Link to="/admin" style={linkStyle}>
								Admin
							</Link>
						</Nav.Item>
					) : null}

					<Container style={{ textAlign: "right" }}>
						<Login />
					</Container>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
