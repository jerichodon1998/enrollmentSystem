import React, { useState } from "react";
import { Modal, Button, Container, Spinner } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { FormControl } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
	clearAuthError,
	loginWithEmailAndPassword,
	loginWithGoogle,
} from "../../redux/authentication/actions";

export default function SignInModal() {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authReducers);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		dispatch(clearAuthError());
		setShow(true);
	};

	const required = (value) => (value ? undefined : "Required");

	const error = (meta) => (meta.error && meta.touched ? { border: "solid 3px red" } : null);

	const showSpinner = (
		<>
			<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />{" "}
		</>
	);

	const onFormSubmit = (values) => {
		dispatch(loginWithEmailAndPassword(values.email, values.password));
	};

	const onSignInWithGoogle = () => {
		dispatch(loginWithGoogle());
	};

	return (
		<>
			<Button variant="secondary" onClick={handleShow}>
				Sign In
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>SIGN IN</Modal.Title>
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
									<Container style={{ textAlign: "center" }}>
										<Button
											type="submit"
											variant="success"
											disabled={
												submitting && auth.loginRequest === true
													? true
													: false
											}
										>
											{auth.loginRequest === true ? showSpinner : null}
											Signin
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
						{auth.loginRequest === true ? showSpinner : null}
						Signin with Google <FcGoogle style={{ fontSize: "32px" }} />
					</Button>
				</Modal.Body>
			</Modal>
		</>
	);
}
