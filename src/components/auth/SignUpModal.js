import React, { useState } from "react";
import { Modal, Button, Container, Spinner } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { FormControl } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
	loginWithGoogle,
	signupWithEmailAndPassword,
	clearAuthError,
} from "../../redux/authentication/actions";

export default function SignUpModal() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducers);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		dispatch(clearAuthError());
		setShow(true);
	};

	const showSpinner = (
		<>
			<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />{" "}
		</>
	);

	const required = (value) => (value ? undefined : "Required");

	const error = (meta) => (meta.error && meta.touched ? { border: "solid 3px red" } : null);

	const onFormSubmit = (values) => {
		dispatch(
			signupWithEmailAndPassword(
				values.email,
				values.password,
				values.firstname.trim(),
				values.lastname.trim()
			)
		);
	};

	const onSignInWithGoogle = () => {
		dispatch(loginWithGoogle());
	};

	return (
		<>
			<Button variant="primary" onClick={handleShow} style={{ marginRight: "10px" }}>
				Sign Up
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>SIGN UP</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ textAlign: "center" }}>
					<Form
						onSubmit={onFormSubmit}
						render={({ handleSubmit, form, submitting, pristine, values }) => {
							return (
								<form
									onSubmit={handleSubmit}
									style={{
										display: "flex",
										justifyContent: "space-between",
										flexDirection: "column",
									}}
								>
									<Field name="email" validate={required}>
										{({ input, meta }) => (
											<>
												<FormControl
													{...input}
													type="email"
													style={{
														...error(meta),
														margin: "0 5px 20px 5px",
													}}
													placeholder="Email"
													required
												/>
											</>
										)}
									</Field>
									<Field name="password" validate={required}>
										{({ input, meta }) => (
											<>
												<FormControl
													{...input}
													type="password"
													style={{
														...error(meta),
														margin: "0 5px 20px 5px",
													}}
													placeholder="Password"
													required
												/>
											</>
										)}
									</Field>
									{auth.error !== null ? (
										<span>{auth.error.errorCode}</span>
									) : null}
									<Field name="firstname" validate={required}>
										{({ input, meta }) => (
											<>
												<FormControl
													{...input}
													type="text"
													style={{
														...error(meta),
														margin: "0 5px 20px 5px",
													}}
													placeholder="First name"
													required
												/>
											</>
										)}
									</Field>
									<Field name="lastname" validate={required}>
										{({ input, meta }) => (
											<>
												<FormControl
													{...input}
													type="text"
													style={{
														...error(meta),
														margin: "0 5px 20px 5px",
													}}
													placeholder="Last name"
													required
												/>
											</>
										)}
									</Field>
									<Container style={{ textAlign: "center" }}>
										<Button
											type="submit"
											variant="success"
											disabled={
												submitting && auth.signupRequest === true
													? true
													: false
											}
										>
											{auth.signupRequest === true ? showSpinner : null}
											Signup
										</Button>
									</Container>
								</form>
							);
						}}
					/>
					<hr />
					<p>OR</p>
					<Button
						variant="secondary"
						onClick={onSignInWithGoogle}
						disabled={auth.loginRequest === true ? true : false}
					>
						{auth.signupRequest === true ? showSpinner : null}
						Signin with Google <FcGoogle style={{ fontSize: "32px" }} />
					</Button>
				</Modal.Body>
			</Modal>
		</>
	);
}
