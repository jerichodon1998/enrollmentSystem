import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logout } from "../../redux/authentication/actions";
import { isStudentEnrolled } from "../../redux/enrollment/actions";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";

export default function Login() {
	const currentUser = useSelector((state) => state.authReducers);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	const renderAuthButton = () => {
		if (currentUser.isLoggedin) {
			return (
				<Button variant="danger" onClick={onLogout}>
					Logout
				</Button>
			);
		}
		return (
			<Container>
				<SignUpModal />
				<SignInModal />
			</Container>
		);
	};

	useEffect(() => {
		dispatch(getCurrentUser());
		dispatch(isStudentEnrolled(currentUser.uid));
	}, [dispatch, currentUser.uid]);

	return renderAuthButton();
}
