import React from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function EnrollForm({ onEnrollSubmit }) {
	const enrollment = useSelector((state) => state.enrollmentReducers);
	const auth = useSelector((state) => state.authReducers);

	const showSpinner = (
		<>
			<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />{" "}
		</>
	);

	const required = (value) => (value ? undefined : "Required");

	const error = (meta) => (meta.error && meta.touched ? { border: "solid 3px red" } : null);

	const renderForm = () => {
		return (
			<Form
				onSubmit={onEnrollSubmit}
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
							{enrollment.error !== null ? (
								<span>{enrollment.error.errorCode}</span>
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
										submitting && enrollment.signupRequest === true
											? true
											: false
									}
								>
									{enrollment.signupRequest === true ? showSpinner : null}
									Enroll Now!
								</Button>
							</Container>
						</form>
					);
				}}
			/>
		);
	};

	return auth.isLoggedin ? (
		renderForm()
	) : (
		<Container style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center" }}>
			Login or Signup to enrol
		</Container>
	);
}
